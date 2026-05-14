import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticFieldHero = ({ children }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;
    const magneticRadius = 200;

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        this.vx = (Math.random() - 0.5) * 2.0;
        this.vy = (Math.random() - 0.5) * 2.0;
        this.baseSize = Math.random() * 4 + 5; // Balanced scale: 5px to 9px
        this.size = this.baseSize;
       
        // Battery-inspired colors: Teal, Emerald, Navy
        const colors = ['#0f766e', '#10b981', '#1e1b4b', '#0ea5e9'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.charge = Math.random() > 0.5 ? 1 : -1;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.pulse = Math.random() * Math.PI;
      }

      update(mX, mY) {
        const dx = mX - this.x;
        const dy = mY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < magneticRadius) {
          const force = (magneticRadius - distance) / magneticRadius;
          const angle = Math.atan2(dy, dx);
         
          // Smooth physics-based movement
          const strength = force * force * 1.5;
          if (this.charge > 0) {
            // Attraction
            this.vx += Math.cos(angle) * strength;
            this.vy += Math.sin(angle) * strength;
            this.size = this.baseSize * (1 + force * 0.5);
          } else {
            // Repulsion
            this.vx -= Math.cos(angle) * strength;
            this.vy -= Math.sin(angle) * strength;
            this.size = this.baseSize * (1 - force * 0.3);
          }
        } else {
          this.size = this.baseSize;
        }

        // Ambient drift
        this.x += this.vx;
        this.y += this.vy;

        // Friction for fluid feel
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Add ambient force
        this.vx += (Math.random() - 0.5) * 0.08;
        this.vy += (Math.random() - 0.5) * 0.08;

        // Bounce off edges
        if (this.x < 0) {
          this.x = 0;
          this.vx *= -1;
        } else if (this.x > dimensions.width) {
          this.x = dimensions.width;
          this.vx *= -1;
        }
        if (this.y < 0) {
          this.y = 0;
          this.vy *= -1;
        } else if (this.y > dimensions.height) {
          this.y = dimensions.height;
          this.vy *= -1;
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
       
        // Glass-like particle (gradient and border)
        const gradient = ctx.createRadialGradient(
          this.x - this.size * 0.3, this.y - this.size * 0.3, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.4, this.color);
        gradient.addColorStop(1, this.color + '00');

        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();



        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrame;
    let time = 0;
   
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
     
      const mX = smoothMouseX.get();
      const mY = smoothMouseY.get();

      // No longer drawing energy field lines/ripples

      particles.forEach(p => {
        p.update(mX, mY);
        p.draw();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, [dimensions, smoothMouseX, smoothMouseY]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Particles are drawn on canvas */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="relative z-20 w-full pt-32 pb-16">
        {children}
      </div>
    </section>
  );
};
export default MagneticFieldHero;
