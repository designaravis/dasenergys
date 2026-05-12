import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coreProducts } from '../data/materials';

const OrbitShowcase = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [rotation, setRotation] = useState(0);
  const products = coreProducts.slice(0, 12);

  const centerProduct = {
    name: "Coin Cell",
    image: "/coin_cell.svg"
  };

  useEffect(() => {
    let frame;
    const animate = () => {
      if (isOrbiting) {
        setRotation(prev => (prev + 0.15) % 360);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isOrbiting]);

  return (
    <div className="relative w-full bg-white py-16 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-800 mb-3 uppercase tracking-wider"
        >
          Product Ecosystem
        </motion.h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm">
          Explore our advanced fabrication equipment orbiting the core production line.
        </p>
      </div>

      {/* ── Desktop Orbital View ── */}
      <div className="hidden lg:flex relative h-[1100px] items-center justify-center">

        {/* Center circle group */}
        <div className="absolute z-40 flex flex-col items-center" style={{ transform: 'translate(-50%,-54%)', left: '50%', top: '50%' }}>
          
          {/* Liquid Energy Layer 1 - Enhanced Visibility */}
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 1],
              borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "50% 50% 33% 67% / 55% 27% 73% 45%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
              rotate: [0, 360]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[540px] h-[540px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(20,184,166,0.15) 0%, rgba(20,184,166,0.05) 60%, transparent 100%)',
              backdropFilter: 'blur(15px)',
              filter: 'blur(2px)', // Soft edge blur
              border: '2px solid rgba(20,184,166,0.2)',
              boxShadow: '0 0 40px rgba(20,184,166,0.15), inset 0 0 20px rgba(255,255,255,0.2)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1
            }}
          />
          {/* Liquid Energy Layer 2 - Enhanced Visibility */}
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
              rotate: [360, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[420px] h-[420px]"
            style={{
              background: 'rgba(20,184,166,0.08)',
              backdropFilter: 'blur(10px)',
              filter: 'blur(1px)',
              border: '1.5px solid rgba(20,184,166,0.25)',
              boxShadow: '0 0 30px rgba(20,184,166,0.1)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: -1
            }}
          />

          <div
            className="w-72 h-72 rounded-full flex items-center justify-center shadow-2xl relative"
            style={{
              background: 'radial-gradient(circle at 40% 35%, #5eead4 0%, #14b8a6 45%, #0f766e 100%)',
              boxShadow: '0 0 80px rgba(20,184,166,0.5), 0 0 120px rgba(20,184,166,0.2)'
            }}
          >
            {/* Enhanced multi-layered ground shadow for premium depth */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 rounded-[100%]"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 80%)',
                filter: 'blur(12px)',
                transform: 'translateX(-50%) scaleY(0.35)',
                opacity: 0.85
              }}
            />
            <div
              className="absolute bottom-11 left-1/2 -translate-x-1/2 w-28 h-4 rounded-[100%]"
              style={{
                background: 'rgba(0,0,0,0.7)',
                filter: 'blur(4px)',
                transform: 'translateX(-50%) scaleY(0.2)',
                opacity: 0.95
              }}
            />
            <img
              src={centerProduct.image}
              alt={centerProduct.name}
              className="w-52 h-52 object-contain relative z-10"
              style={{ filter: 'drop-shadow(0px 18px 24px rgba(0,0,0,0.55))' }}
            />
          </div>
          <div className="mt-5 px-10 py-2 border-2 border-teal-500 rounded-full text-teal-600 font-bold text-sm tracking-[0.2em] uppercase bg-white shadow-sm">
            {centerProduct.name}
          </div>
        </div>

        {/* Orbiting items */}
        {products.map((product, index) => {
          const angle = (rotation + (index * (360 / products.length))) * (Math.PI / 180);
          const radius = 480;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isHovered = hoveredId === product.id;

          return (
            <div
              key={product.id}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                zIndex: isHovered ? 100 : 40,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div
                className="flex flex-col items-center cursor-pointer"
                onMouseEnter={() => { setHoveredId(product.id); setIsOrbiting(false); }}
                onMouseLeave={() => { setHoveredId(null); setIsOrbiting(true); }}
              >
                {/* Image card */}
                <motion.div
                  className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center p-3 border border-gray-100"
                  animate={{
                    scale: isHovered ? 1.12 : 1,
                    boxShadow: isHovered
                      ? '0 16px 48px rgba(20,184,166,0.35), 0 4px 16px rgba(0,0,0,0.18)'
                      : '0 8px 28px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    style={{ filter: 'drop-shadow(0px 6px 10px rgba(0,0,0,0.35)) drop-shadow(0px 2px 4px rgba(0,0,0,0.20))' }}
                  />
                </motion.div>

                {/* Teal pill label */}
                <div
                  className="mt-2 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-center whitespace-nowrap overflow-hidden"
                  style={{
                    background: 'linear-gradient(90deg, #0d9488, #14b8a6)',
                    maxWidth: '130px',
                    textOverflow: 'ellipsis'
                  }}
                  title={product.name}
                >
                  {product.name.length > 16 ? product.name.slice(0, 15) + '…' : product.name}
                </div>

                {/* Hover tooltip card */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-teal-100 p-4 z-50"
                    >
                      <p className="text-teal-600 text-[9px] font-black uppercase tracking-widest mb-1">{product.code}</p>
                      <h3 className="text-slate-800 font-bold text-sm mb-1">{product.name}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-2">{product.description}</p>
                      <div className="text-[9px] text-teal-600 bg-teal-50 px-2 py-1 rounded-lg border border-teal-200 inline-block">
                        {product.specs}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Mobile Grid View ── */}
      <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 mt-8">
        {/* Center product at top */}
        <div className="col-span-2 sm:col-span-3 flex justify-center mb-6">
          <div className="flex flex-col items-center">
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center shadow-lg relative"
              style={{ background: 'radial-gradient(circle, #5eead4 0%, #0f766e 100%)' }}
            >
              {/* Mobile Outer Aura with Liquid Energy Finish */}
              <motion.div 
                animate={{ 
                  borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "50% 50% 33% 67% / 55% 27% 73% 45%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
                  rotate: [0, 360]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[140%] h-[140%] shadow-inner"
                style={{ 
                  background: 'rgba(20, 184, 166, 0.12)',
                  backdropFilter: 'blur(8px)',
                  filter: 'blur(2px)',
                  border: '2px solid rgba(20, 184, 166, 0.25)',
                  zIndex: -1 
                }}
              />
              {/* Mobile Ground Shadow */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-24 h-4 rounded-[100%]"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
                  filter: 'blur(10px)',
                  transform: 'translateX(-50%) scaleY(0.4)',
                }}
              />
              <img 
                src={centerProduct.image} 
                alt={centerProduct.name} 
                className="w-24 h-24 object-contain relative z-10" 
                style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.45))' }}
              />
            </div>
            <div className="mt-3 px-6 py-1.5 border-2 border-teal-500 rounded-full text-teal-600 font-bold text-xs tracking-widest uppercase">
              {centerProduct.name}
            </div>
          </div>
        </div>

        {products.map((product) => (
          <motion.div
            key={product.id}
            whileTap={{ scale: 0.97 }}
            className="bg-white border border-gray-100 shadow-md p-4 rounded-2xl flex flex-col items-center gap-2"
          >
            <div className="w-full h-20 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="h-full object-contain" />
            </div>
            <div
              className="text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-center w-full truncate"
              style={{ background: 'linear-gradient(90deg, #0d9488, #14b8a6)' }}
            >
              {product.name}
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default OrbitShowcase;