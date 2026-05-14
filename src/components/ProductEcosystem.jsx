import React, { useState, useEffect, useMemo, memo } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence, useMotionValue, animate, useTransform } from 'framer-motion';
import { 
  X, Cpu, Zap, Settings, ShieldCheck, Box, 
  ArrowUpRight, Factory, Target, Info
} from 'lucide-react';
import { ecosystems } from '../data/materials';

// --- Orbit Item Component Optimized for Continuous Motion ---
const OrbitItem = memo(({ item, index, total, rotation, isAnyHovered, onMouseEnter, onSelectItem, hoverScale }) => {
  const angle = useTransform(rotation, (r) => {
    const baseAngle = (index * (360 / total));
    return (r + baseAngle) * (Math.PI / 180);
  });

  const radius = useMemo(() => window.innerWidth < 768 ? 150 : 280, []);
  
  const x = useTransform(angle, (a) => Math.cos(a) * radius);
  const y = useTransform(angle, (a) => Math.sin(a) * radius);

  return (
    <motion.div
      className="absolute z-30 subpixel-antialiased left-1/2 top-1/2"
      style={{ 
        x, y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isAnyHovered ? 0.3 : 1, 
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        transformStyle: 'preserve-3d'
      }}
      whileHover={{ 
        scale: hoverScale, 
        opacity: 1, 
        zIndex: 100,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseEnter={onMouseEnter}
      onClick={() => onSelectItem(item)}
    >
      <div className={`w-[60px] h-[60px] md:w-[85px] md:h-[85px] bg-white rounded-2xl border border-slate-100 shadow-lg overflow-hidden group/item hover:border-brand-primary transition-all cursor-pointer p-1 flex flex-col`}>
        <div className="flex-1 w-full rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center mb-0.5">
          <img 
            src={item.image || "/coin_cell.png"} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
            style={{ imageRendering: 'high-quality' }}
          />
          <div className="absolute inset-x-1 bottom-1 py-1 px-1 bg-brand-primary rounded-lg shadow-md">
            <span className="text-[5.5px] font-bold text-white uppercase tracking-[0.1em] block text-center truncate leading-none">{item.name}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// --- Mini Orbit Component for Main Page ---
const MiniOrbit = ({ category, data, onSelectItem, onHoverItem }) => {
  const rotation = useMotionValue(0);
  const [localHoveredId, setLocalHoveredId] = useState(null);

  useEffect(() => {
    const controls = animate(rotation, [0, 360], {
      duration: 60,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [rotation]);

  const hoverScale = useMemo(() => window.innerWidth < 768 ? 1.8 : 4, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`flex flex-col relative min-h-[450px] md:min-h-[650px] transition-all duration-300 ${localHoveredId ? 'z-[1001]' : 'z-10'}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div 
        className="flex-1 relative flex items-center justify-center py-4 md:py-12"
        onMouseLeave={() => { setLocalHoveredId(null); onHoverItem(null); }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* CENTER PRODUCT CORE */}
        <div className={`relative z-20 w-32 h-32 md:w-64 md:h-64 bg-brand-primary rounded-full flex items-center justify-center p-8 shadow-2xl shadow-brand-primary/30 transition-all duration-700 ${localHoveredId ? 'scale-110' : ''}`}>
          <img src={data.mainProduct} alt={category} className="w-full h-full object-contain relative z-10" />
          <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-brand-primary font-black text-[12px] md:text-base uppercase tracking-[0.2em] md:tracking-[0.4em] bg-white px-6 md:px-8 py-2 md:py-3 rounded-full shadow-xl border-2 border-brand-primary">
              {category} Cell
            </span>
          </div>
        </div>

        {/* ORBITING ITEMS */}
        {data.items.map((item, index) => (
          <OrbitItem 
            key={item.id}
            item={item}
            index={index}
            total={data.items.length}
            rotation={rotation}
            isAnyHovered={localHoveredId !== null && localHoveredId !== item.id}
            onMouseEnter={() => { setLocalHoveredId(item.id); onHoverItem(item); }}
            onSelectItem={onSelectItem}
            hoverScale={hoverScale}
          />
        ))}

        {/* Orbit Background Rings */}
        <div className={`absolute w-[260px] h-[260px] md:w-[560px] md:h-[560px] border border-slate-50 rounded-full pointer-events-none transition-all duration-700 ${localHoveredId ? 'opacity-0' : 'opacity-100'}`} />
        <div className={`absolute w-[320px] h-[320px] md:w-[680px] md:h-[680px] border border-slate-50 rounded-full pointer-events-none transition-all duration-700 ${localHoveredId ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      <div className={`flex justify-end items-center transition-all duration-500 mt-10 ${localHoveredId ? 'opacity-0 blur-2xl pointer-events-none' : 'opacity-100'}`}>
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
    <section className="relative w-full bg-white pt-8 pb-0 md:pt-12 md:pb-6" id="ecosystem">
      <div className="max-w-[1360px] mx-auto px-4 md:px-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-28">
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
              className="relative w-full max-w-[1600px] bg-white rounded-[40px] md:rounded-[50px] overflow-hidden shadow-6xl flex flex-col h-[95vh] md:h-[90vh] z-10"
            >
              <div className="px-6 md:px-10 py-4 md:py-6 border-b border-slate-100 bg-white z-20 relative flex justify-between items-center">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-[8px] md:text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] md:tracking-[0.3em]">{catalogData.title}</span>
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-300 rounded-full" />
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Manufacturing Guide</p>
                </div>
                <button onClick={() => setShowFullCatalog(false)} className="w-8 h-8 md:w-10 md:h-10 bg-slate-50 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-slate-400">
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              <div className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col justify-start py-10 md:py-20 px-4 md:px-8">
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
                      <div className="w-full lg:w-[35%] flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                          {leftMaterials.map((item) => (
                            <div key={item.id} onClick={() => setSelectedItem(item)} className="flex items-center gap-6 cursor-pointer group">
                              <div className="w-24 h-24 bg-white rounded-[28px] border-2 border-slate-100 shadow-sm flex items-center justify-center p-3 shrink-0 group-hover:border-brand-primary group-hover:shadow-lg transition-all duration-300">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                              </div>
                              <div className="flex flex-col items-start">
                                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1.5">{item.code}</span>
                                <span className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-brand-primary transition-colors">{item.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.specs?.[0]?.split(':')[1] || item.specs?.[0]}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="w-full lg:w-[30%] flex flex-col items-center justify-center shrink-0 my-10 lg:my-0">
                        <div className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center mb-10">
                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent rounded-full blur-3xl opacity-60" />
                          <img src={catalogData.mainProduct} alt="Core" className="w-full h-full object-contain drop-shadow-2xl relative z-10" />
                        </div>
                        <div className="bg-white border-2 border-slate-100 shadow-xl rounded-3xl px-12 py-6 flex flex-col items-center">
                          <div className="flex flex-col items-center text-center">
                            {catalogData.title.split('|').map((part, i) => (
                              <span key={i} className="text-xl font-black text-slate-900 uppercase tracking-[0.3em] block">
                              {part.trim()}
                            </span>
                            ))}
                          </div>
                          <span className="text-xs font-black text-brand-primary uppercase tracking-[0.5em] mt-2">{catalogData.title.split(' ')[0]} Output</span>
                        </div>
                      </div>

                      <div className="w-full lg:w-[35%] flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                          {rightMaterials.map((item) => (
                            <div key={item.id} onClick={() => setSelectedItem(item)} className="flex items-center justify-end gap-6 text-right cursor-pointer group">
                              <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1.5">{item.code}</span>
                                <span className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-brand-primary transition-colors">{item.name}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.specs?.[0]?.split(':')[1] || item.specs?.[0]}</span>
                              </div>
                              <div className="w-24 h-24 bg-white rounded-[28px] border-2 border-slate-100 shadow-sm flex items-center justify-center p-3 shrink-0 group-hover:border-brand-primary group-hover:shadow-lg transition-all duration-300">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
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

      {/* Deep Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[10000]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setSelectedItem(null)} />
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