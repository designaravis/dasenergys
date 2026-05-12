import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Cpu, Zap, Settings, ShieldCheck, Box, 
  ArrowUpRight, Factory, Target, Info
} from 'lucide-react';
import { ecosystems } from '../data/materials';

// --- Mini Orbit Component for Main Page ---
const MiniOrbit = ({ category, data, onSelectItem, onHoverItem }) => {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [localHoveredId, setLocalHoveredId] = useState(null);

  useEffect(() => {
    let frame;
    const animate = () => {
      if (!isPaused) {
        setRotation(prev => (prev + 0.2) % 360);
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`flex flex-col relative transition-all duration-700 min-h-[450px] md:min-h-[650px] ${localHoveredId ? 'z-[1001]' : 'z-10'}`}
    >
      <div 
        className="flex-1 relative flex items-center justify-center py-4 md:py-12"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); onHoverItem(null); setLocalHoveredId(null); }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className={`relative z-20 w-32 h-32 md:w-64 md:h-64 bg-brand-primary rounded-full flex items-center justify-center p-8 shadow-2xl shadow-brand-primary/30 transition-all duration-700 ${localHoveredId ? 'scale-110' : ''}`}>
          {/* Photorealistic Studio Shadow System (Prismatic Only) */}
          {category === 'Prismatic' && (
            <div className="absolute inset-0 pointer-events-none z-[5]">
              {/* Layer 1: Ultra-Sharp Contact Point */}
              <div 
                className="absolute bottom-[21%] left-1/2 w-[58%] h-[5%] rounded-[100%]"
                style={{ 
                  background: 'rgba(0,0,0,0.98)',
                  filter: 'blur(3px)',
                  transform: 'translateX(-62%) scaleY(0.4) rotate(-1.5deg)',
                }}
              />
              {/* Layer 2: Soft Ambient Occlusion with Color Bleed (Teal tint) */}
              <div 
                className="absolute bottom-[17%] left-1/2 w-[82%] h-[18%] rounded-[100%]"
                style={{ 
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(15,118,110,0.2) 50%, transparent 85%)',
                  filter: 'blur(12px)',
                  transform: 'translateX(-58%) scaleY(0.45) rotate(-2.5deg)',
                }}
              />
              {/* Layer 3: Directional Skew (Bottom-Left Tail) */}
              <div 
                className="absolute bottom-[15%] left-1/2 w-[95%] h-[12%] rounded-[100%]"
                style={{ 
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 80%)',
                  filter: 'blur(25px)',
                  transform: 'translateX(-85%) scaleY(0.3) rotate(-6deg)',
                }}
              />
              {/* Layer 4: Micro-Contact Shadow (Inner edge) */}
              <div 
                className="absolute bottom-[22%] left-1/2 w-[45%] h-[3%] rounded-[100%]"
                style={{ 
                  background: 'rgba(0,0,0,0.5)',
                  filter: 'blur(1px)',
                  transform: 'translateX(-70%) scaleY(0.5)',
                }}
              />
            </div>
          )}
          <img src={data.mainProduct} alt={category} className="w-full h-full object-contain relative z-10" />
          <div className="absolute bottom-4 md:-bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-brand-primary font-black text-[10px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.3em] bg-white px-4 md:px-6 py-1.5 md:py-2 rounded-full shadow-xl border-2 border-brand-primary">
              {category} Cell
            </span>
          </div>
        </div>

        {data.items.map((item, index) => {
          const angle = (rotation + (index * (360 / data.items.length))) * (Math.PI / 180);
          const radius = window.innerWidth < 768 ? 100 : 280;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const hoverScale = window.innerWidth < 768 ? 1.8 : 4;
          const glowShadow = window.innerWidth < 768 
            ? "shadow-[0_0_30px_rgba(0,163,130,0.4)]" 
            : "shadow-[0_0_60px_rgba(0,163,130,0.8)]";

          return (
            <motion.div
              key={item.id}
              className="absolute z-30"
              style={{ 
                left: `calc(50% + ${x}px - 40px)`, top: `calc(50% + ${y}px - 40px)`,
                opacity: localHoveredId && localHoveredId !== item.id ? 0.3 : 1,
                zIndex: localHoveredId === item.id ? 100 : 30
              }}
              whileHover={{ scale: hoverScale, rotate: 0, z: 100 }}
              onMouseEnter={() => { setLocalHoveredId(item.id); onHoverItem(item); }}
              onClick={() => onSelectItem(item)}
            >
              <div className={`w-[70px] h-[70px] md:w-[85px] md:h-[85px] bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden group/item hover:border-brand-primary transition-all cursor-pointer p-1 flex flex-col ${localHoveredId === item.id ? `${glowShadow} border-brand-primary` : ''}`}>
                <div className="flex-1 w-full rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center mb-0.5">
                  <img src={item.image || "/coin_cell.png"} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-x-1 bottom-1 py-1 px-1 bg-brand-primary rounded-lg shadow-md transition-all duration-300">
                    <span className="text-[5.5px] font-bold text-white uppercase tracking-[0.1em] block text-center truncate leading-none">{item.name}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        <div className={`absolute w-[260px] h-[260px] md:w-[560px] md:h-[560px] border border-slate-50 rounded-full pointer-events-none transition-all duration-700 ${localHoveredId ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute w-[320px] h-[320px] md:w-[680px] md:h-[680px] border border-slate-50 rounded-full pointer-events-none transition-all duration-700 ${localHoveredId ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      <div className={`flex justify-end items-center transition-all duration-500 mt-6 ${localHoveredId ? 'opacity-0 blur-2xl pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => onSelectItem(data.items[0])} 
          className="bg-white border-2 border-brand-primary text-brand-primary px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-md shadow-brand-primary/20 hover:bg-brand-primary hover:text-white hover:shadow-xl hover:shadow-brand-primary/40 transition-all duration-300 group/btn"
        >
          Technical Catalog 
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Ecosystem Component ---
const ProductEcosystem = ({ onOpenCatalog }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [catalogData, setCatalogData] = useState(null);

  return (
    <section className="relative w-full bg-white pt-8 pb-12 md:pt-12 md:pb-20" id="ecosystem">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12">
        <div className="text-center max-w-4xl mx-auto mb-6 md:mb-24">
          <span className="section-tag">Scientific Infrastructure</span>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black text-slate-900 mb-8 leading-[0.8] tracking-tighter uppercase">
            Visual <br /> <span className="text-brand-primary">Catalog</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed mb-6">
            The complete 4-line production ecosystem. Hover over material photos to see high-resolution previews and technical descriptions.
          </p>
          <h3 className="text-xl md:text-2xl font-black text-brand-primary uppercase tracking-[0.2em] mb-10">Production Ecosystem</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 lg:gap-48">
          {Object.entries(ecosystems).map(([key, data]) => (
            <MiniOrbit 
              key={key} category={key} data={data} 
              onSelectItem={(item) => {
                if (item === data.items[0] && !selectedItem) {
                  setCatalogData(data);
                  setShowFullCatalog(true);
                } else {
                  setSelectedItem(item);
                }
              }}
              onHoverItem={setHoveredItem}
            />
          ))}
        </div>
      </div>

      {/* --- REFINED SLEEK CATALOG MODAL --- */}
      {showFullCatalog && catalogData && ReactDOM.createPortal(
        <AnimatePresence>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
              onClick={() => setShowFullCatalog(false)} 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} 
              className="relative w-full max-w-[1600px] bg-white rounded-[40px] md:rounded-[50px] overflow-hidden shadow-6xl flex flex-col h-[90vh] z-10"
            >
              {/* Header */}
              <div className="px-10 py-6 border-b border-slate-100 bg-white z-20 relative flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">{catalogData.title}</span>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Symmetric Manufacturing Guide</p>
                </div>
                <button onClick={() => setShowFullCatalog(false)} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic Content Area (Screenshot Aesthetic) */}
              <div className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col justify-center py-20 px-8">
                
                {/* Background Concentric Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-[400px] h-[400px] rounded-full border border-slate-200 absolute" />
                  <div className="w-[650px] h-[650px] rounded-full border border-slate-100 absolute" />
                  <div className="w-[900px] h-[900px] rounded-full border border-slate-50 absolute" />
                </div>

                {(() => {
                  const materials = catalogData.items || [];
                  const midpoint = Math.ceil(materials.length / 2);
                  const leftMaterials = materials.slice(0, midpoint);
                  const rightMaterials = materials.slice(midpoint);

                  return (
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-[1400px] w-full mx-auto gap-12 lg:gap-0">
                      
                      {/* --- LEFT WING (Symmetric 2-Column Grid) --- */}
                      <div className="w-full lg:w-[35%] flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                          {leftMaterials.map((item) => (
                            <div key={item.id} onClick={() => setSelectedItem(item)} className="flex items-center gap-4 cursor-pointer group">
                              <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center p-2 shrink-0 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                              </div>
                              <div className="flex flex-col items-start">
                                <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1">{item.code}</span>
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-brand-primary transition-colors">{item.name}</span>
                                <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.specs?.[0]?.split(':')[1] || item.specs?.[0]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* --- CENTER PRODUCT CORE --- */}
                      <div className="w-full lg:w-[30%] flex flex-col items-center justify-center shrink-0 my-10 lg:my-0">
                        <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center mb-8">
                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent rounded-full blur-2xl opacity-60" />
                          <img src={catalogData.mainProduct} alt="Core" className="w-full h-full object-contain drop-shadow-2xl relative z-10" />
                        </div>
                        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl px-10 py-4 flex flex-col items-center">
                          <div className="flex flex-col items-center text-center">
                            {catalogData.title.split('|').map((part, i) => (
                              <span key={i} className="text-sm font-black text-slate-900 uppercase tracking-widest block">
                                {part.trim()}
                              </span>
                            ))}
                          </div>
                          <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.3em] mt-1">{catalogData.title.split(' ')[0]} Output</span>
                        </div>
                      </div>

                      {/* --- RIGHT WING (Symmetric 2-Column Grid) --- */}
                      <div className="w-full lg:w-[35%] flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10">
                          {rightMaterials.map((item) => (
                            <div key={item.id} onClick={() => setSelectedItem(item)} className="flex items-center justify-end gap-4 text-right cursor-pointer group">
                              <div className="flex flex-col items-end">
                                <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1">{item.code}</span>
                                <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-brand-primary transition-colors">{item.name}</span>
                                <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.specs?.[0]?.split(':')[1] || item.specs?.[0]}</span>
                              </div>
                              <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center p-2 shrink-0 group-hover:border-brand-primary group-hover:shadow-md transition-all">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>

            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}

      {/* Deep Detail Modal (Triggered when clicking a specific item) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[10000]">
            {/* Background Overlay */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" 
              onClick={() => setSelectedItem(null)} 
            />

            {/* Perfect Middle Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: "-40%" }} 
              animate={{ scale: 1, opacity: 1, y: "-50%" }} 
              exit={{ scale: 0.9, opacity: 0, y: "-40%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 top-1/2 z-[10001] w-[90%] md:w-[90%] max-w-6xl mx-auto bg-white rounded-3xl md:rounded-[60px] overflow-hidden shadow-6xl flex flex-col md:flex-row max-h-[60vh] md:max-h-[85vh]"
            >
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-slate-100/80 backdrop-blur-md rounded-full flex items-center justify-center z-50 hover:bg-brand-primary hover:text-white transition-all">
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto">
                <div className="bg-slate-50 p-4 md:p-20 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 relative overflow-hidden h-[120px] md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-100" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <img src={selectedItem.image || "/coin_cell.png"} alt={selectedItem.name} className="w-full h-full object-contain drop-shadow-5xl" />
                  </div>
                </div>
                
                <div className="p-8 md:p-20 flex flex-col justify-center bg-white h-auto">
                  <div className="inline-flex items-center gap-3 px-3 py-1 bg-brand-soft text-brand-primary rounded-full mb-2 md:mb-8 w-fit">
                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">{selectedItem.code}</span>
                  </div>
                  
                  <h2 className="text-lg md:text-6xl font-black mb-2 md:mb-6 text-slate-900 uppercase tracking-tighter leading-[0.9]">{selectedItem.name}</h2>
                  <p className="text-sm md:text-xl text-slate-500 mb-4 md:mb-10 leading-relaxed font-bold">{selectedItem.desc}</p>

                  <div className="flex flex-col gap-4 mt-auto">
                    <button onClick={() => { setSelectedItem(null); setShowFullCatalog(false); window.location.href = '#contact'; }} className="w-full py-4 md:py-6 bg-brand-primary text-white rounded-xl md:rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-normal md:tracking-[0.2em] shadow-xl shadow-brand-primary/20">
                      Request Technical Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductEcosystem;