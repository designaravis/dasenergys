import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';

const OrbTrail = ({ color }) => (
  <motion.div
    className="absolute rounded-full blur-xl pointer-events-none opacity-20"
    style={{
      width: 100,
      height: 100,
      backgroundColor: color,
    }}
    animate={{
      scale: [1, 1.5],
      opacity: [0.2, 0],
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "easeOut"
    }}
  />
);

const EnergyOrb = ({ id, initialPos, size, polarity, mouseX, mouseY, allOrbs, onUpdate }) => {
  const orbRef = useRef(null);
  const [pos, setPos] = useState(initialPos);
  const [vel, setVel] = useState({ x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1 });

  const springX = useSpring(initialPos.x, { damping: 40, stiffness: 120 });
  const springY = useSpring(initialPos.y, { damping: 40, stiffness: 120 });

  const isPositive = polarity === 'positive';
  const themeColor = isPositive ? '#10b981' : '#1e3a8a';
  const glowColor = isPositive ? '#34d399' : '#3b82f6';

  useAnimationFrame(() => {
    if (!orbRef.current) return;

    let nx = pos.x + vel.x;
    let ny = pos.y + vel.y;
    let nvx = vel.x;
    let nvy = vel.y;

    // 1. Boundary & Friction
    if (nx < 5 || nx > 95) nvx *= -0.8;
    if (ny < 5 || ny > 95) nvy *= -0.8;
    nvx *= 0.99; // subtle friction
    nvy *= 0.99;

    // 2. Mouse Interaction
    const mx = (mouseX.get() / window.innerWidth) * 100;
    const my = (mouseY.get() / window.innerHeight) * 100;
    const mdx = mx - nx;
    const mdy = my - ny;
    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

    if (mDist < 25) {
      const force = (25 - mDist) / 25;
      // Mouse acts as a "disruptor" - it attracts opposite slightly but mostly pushes/pulls based on proximity
      const pull = force * 0.5;
      nvx += (mdx / mDist) * pull;
      nvy += (mdy / mDist) * pull;

      // Rapid separation on very close hover
      if (mDist < 5) {
        nvx -= (mdx / mDist) * 2;
        nvy -= (mdy / mDist) * 2;
      }
    }

    // 3. Inter-Orb Interaction
    allOrbs.current.forEach(other => {
      if (other.id === id) return;
      const odx = other.pos.x - nx;
      const ody = other.pos.y - ny;
      const oDist = Math.sqrt(odx * odx + ody * ody);

      if (oDist < 20) {
        const oForce = (20 - oDist) / 20;
        const isOpposite = other.polarity !== polarity;

        // Opposite attracts, Same repels
        const magnitude = isOpposite ? oForce * 0.05 : -oForce * 0.15;
        nvx += (odx / oDist) * magnitude;
        nvy += (ody / oDist) * magnitude;
      }
    });

    const finalX = nx + nvx;
    const finalY = ny + nvy;

    setPos({ x: finalX, y: finalY });
    setVel({ x: nvx, y: nvy });
    onUpdate(id, { x: finalX, y: finalY });

    springX.set((window.innerWidth * finalX) / 100);
    springY.set((window.innerHeight * finalY) / 100);
  });

  const scale = useTransform(vel.x, [-2, 2], [0.9, 1.1]);
  const rotate = useTransform(vel.x, [-2, 2], [-10, 10]);

  return (
    <motion.div
      ref={orbRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        scale,
        rotate,
      }}
      className="z-10"
    >
      {/* Energy Trail */}
      <OrbTrail color={themeColor} />

      {/* Outer Halo */}
      <motion.div
        className="absolute inset-[-30%] rounded-full blur-[60px]"
        style={{ background: `radial-gradient(circle, ${themeColor}22 0%, transparent 70%)` }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
      />

      {/* Glass Orb Body */}
      <div
        className="absolute inset-0 rounded-full border border-white/40 shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden backdrop-blur-xl"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, ${themeColor}33 100%)`,
          boxShadow: `inset 0 0 20px ${themeColor}22`,
        }}
      >
        {/* Core Energy Field */}
        <motion.div
          className="absolute inset-[20%] rounded-full blur-2xl"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 80%)` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: isPositive ? 2.5 : 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Refraction Shine */}
        <div className="absolute top-[10%] left-[15%] w-[30%] h-[30%] bg-white/30 rounded-full blur-md" />
        <div className="absolute bottom-[10%] right-[15%] w-[20%] h-[20%] bg-white/10 rounded-full blur-sm" />
      </div>

      {/* Ambient Pulse Ring */}
      <motion.div
        className="absolute inset-[-10%] border border-white/20 rounded-full"
        animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 4 }}
      />
    </motion.div>
  );
};

const EnergyOrbField = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const orbData = useMemo(() => [
    { id: 1, size: 180, initialPos: { x: 15, y: 35 }, polarity: 'positive' },
    { id: 2, size: 140, initialPos: { x: 85, y: 20 }, polarity: 'negative' },
    { id: 3, size: 200, initialPos: { x: 75, y: 75 }, polarity: 'positive' },
    { id: 4, size: 120, initialPos: { x: 10, y: 80 }, polarity: 'negative' },
    { id: 5, size: 160, initialPos: { x: 50, y: 45 }, polarity: 'positive' },
    { id: 6, size: 100, initialPos: { x: 90, y: 55 }, polarity: 'negative' },
  ], []);

  const allOrbsRef = useRef(orbData.map(o => ({ ...o, pos: o.initialPos })));

  const handleOrbUpdate = (id, pos) => {
    const orb = allOrbsRef.current.find(o => o.id === id);
    if (orb) orb.pos = pos;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background Depth layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-white to-emerald-50/30" />

      {/* Magnetic Distortion SVG Filter (Subtle) */}
      <svg className="hidden">
        <defs>
          <filter id="magnetic-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: 'url(#magnetic-distortion)', width: '100%', height: '100%' }}>
        {orbData.map((orb) => (
          <EnergyOrb
            key={orb.id}
            {...orb}
            mouseX={mouseX}
            mouseY={mouseY}
            allOrbs={allOrbsRef}
            onUpdate={handleOrbUpdate}
          />
        ))}
      </div>

      {/* Mouse Gradient Interaction */}
      <motion.div
        className="fixed w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px] opacity-[0.07]"
        style={{
          left: -400,
          top: -400,
          x: mouseX,
          y: mouseY,
          background: 'radial-gradient(circle, #10b981 0%, #1e3a8a 50%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default EnergyOrbField;
