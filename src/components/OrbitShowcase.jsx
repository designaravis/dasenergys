import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Settings, ShieldCheck, Box } from 'lucide-react';
import { coreProducts } from '../data/materials';

const OrbitShowcase = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [rotation, setRotation] = useState(0);
  const products = coreProducts;

  const centerProduct = {
    name: "Coin Cell Battery",
    image: "/coin_cell.png"
  };

  useEffect(() => {
    let frame;
    const animate = () => {
      if (isOrbiting) {
        setRotation(prev => (prev + 0.2) % 360);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isOrbiting]);

  return (
    <div className="relative w-full min-h-[800px] flex items-center justify-center py-20 overflow-hidden bg-slate-950">

      {/* Background Rings */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-400/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyan-400/5 rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-white mb-4 uppercase tracking-wider"
          >
            Product Ecosystem
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our advanced fabrication equipment orbiting the core production line.
          </p>
        </div>

        {/* Desktop Orbital View */}
        <div className="hidden lg:flex relative h-[650px] items-center justify-center">
          {/* ... existing code ... */}
          <div className="relative z-40 w-64 h-64 rounded-full flex items-center justify-center p-8 border-2 border-cyan-400/50 bg-slate-900 shadow-[0_0_40px_rgba(0,255,255,0.2)]">
            <div className="absolute inset-0 bg-cyan-400/5 rounded-full animate-pulse" />
            <img
              src={centerProduct.image}
              alt={centerProduct.name}
              className="w-full h-full object-contain relative z-10"
            />
            <div className="absolute -bottom-4 bg-cyan-400 text-slate-950 px-4 py-1 text-xs font-bold rounded-sm uppercase">
              Final Output
            </div>
          </div>

          {products.map((product, index) => {
            const angle = (rotation + (index * (360 / products.length))) * (Math.PI / 180);
            const radius = 280;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const isHovered = hoveredId === product.id;

            return (
              <div
                key={product.id}
                className="absolute w-0 h-0"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  zIndex: isHovered ? 100 : 40,
                }}
              >
                {isHovered && (
                  <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
                    style={{ pointerEvents: 'none', zIndex: -1 }}
                  >
                    <motion.line
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      x1="400" y1="400"
                      x2={400 - x} y2={400 - y}
                      stroke="#22d3ee"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </svg>
                )}

                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredId(product.id);
                    setIsOrbiting(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    setIsOrbiting(true);
                  }}
                >
                  <motion.div
                    className="w-full h-full rounded-full flex items-center justify-center border-2 border-cyan-400/30 bg-slate-900 shadow-lg relative z-10"
                    animate={{
                      scale: isHovered ? 1.4 : 1,
                      borderColor: isHovered ? "rgba(34, 211, 238, 0.8)" : "rgba(34, 211, 238, 0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {product.icon}
                  </motion.div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                        className="absolute left-full ml-6 top-1/2 -translate-y-1/2 w-[420px] bg-slate-900/95 backdrop-blur-xl rounded-3xl overflow-hidden z-[110]"
                        style={{ cursor: 'default' }}
                      >
                        <div className="flex gap-5 p-6">
                          <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>

                          <div className="flex-1">
                            <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                              {product.code}
                            </p>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {product.name}
                            </h3>
                            <p className="text-slate-300 text-xs leading-relaxed mb-3">
                              {product.description}
                            </p>
                            <div className="text-[10px] text-cyan-300 bg-cyan-400/10 px-3 py-1.5 rounded-lg border border-cyan-400/20 inline-block">
                              {product.specs}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Grid View */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileTap={{ scale: 0.98 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <p className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-0.5">{product.code}</p>
                  <h4 className="text-lg font-bold text-white">{product.name}</h4>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{product.description}</p>
              <div className="text-[9px] text-cyan-300 bg-cyan-400/10 px-3 py-1.5 rounded-lg border border-cyan-400/20 w-fit">
                {product.specs}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrbitShowcase;