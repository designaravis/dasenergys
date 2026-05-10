import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, Download, Mail, 
  ArrowUpRight, Factory, Zap, Target, LayoutGrid, List
} from 'lucide-react';
import { ecosystems } from '../data/materials';

const CatalogPage = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('coin');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-brand-primary selection:text-white">
      {/* Precision Header */}
      <nav className="sticky top-0 z-[100] bg-white border-b border-slate-200 px-10 py-5 flex justify-between items-center shadow-sm backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-none mb-1">Technical Catalog</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Precision R&D Equipment Guide</p>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 mx-2" />

          {/* Category Switcher in Header for better space utility */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {Object.entries(ecosystems).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === key 
                  ? 'bg-white text-brand-primary shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {data.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-11 px-6 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
            PDF Export <Download className="w-4 h-4" />
          </button>
          <button className="h-11 px-8 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-all flex items-center gap-2 shadow-lg shadow-slate-900/10">
            Bulk Inquiry <Mail className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Precision Grid */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-[1600px] mx-auto"
          >
            {/* Tighter Header section */}
            <div className="flex justify-between items-end mb-8 border-b-2 border-slate-100 pb-6">
              <div>
                <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Product Ecosystem</span>
                <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">{ecosystems[activeCategory].title}</h2>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-slate-200 mb-1">{ecosystems[activeCategory].items.length}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Active Components</div>
              </div>
            </div>

            {/* THE CENTRAL HUB LAYOUT */}
            <div className="bg-white border border-slate-200 rounded-[48px] p-10 md:p-16 shadow-sm relative overflow-hidden">
              
              {/* Decorative Hub Rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-50 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-50 rounded-full pointer-events-none" />

              <div className="relative z-10 grid grid-cols-12 gap-8 items-center">
                
                {/* LEFT FLANK: 4 Machines */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                  {ecosystems[activeCategory].items.slice(0, 4).map((item) => (
                    <MachineHubCard key={item.id} item={item} />
                  ))}
                </div>

                {/* CENTRAL CORE: The Hub */}
                <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center py-12">
                  <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-brand-soft/20 rounded-full blur-[120px]" />
                    <motion.img 
                      key={activeCategory}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={ecosystems[activeCategory].mainProduct} 
                      alt={activeCategory} 
                      className="w-full h-full object-contain relative z-10 animate-float drop-shadow-2xl"
                    />
                  </div>
                  <div className="mt-8 text-center bg-white/80 backdrop-blur-md px-8 py-4 rounded-3xl border border-slate-100 shadow-sm relative z-20">
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-1">Production Core</h3>
                    <p className="text-brand-primary text-[10px] font-black uppercase tracking-[0.4em]">{activeCategory} Cell output</p>
                  </div>
                </div>

                {/* RIGHT FLANK: 4 Machines */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                  {ecosystems[activeCategory].items.slice(4, 8).map((item) => (
                    <MachineHubCard key={item.id} item={item} reverse />
                  ))}
                </div>

                {/* BOTTOM PERIPHERY: Remaining machines */}
                <div className="col-span-12 flex flex-wrap justify-center gap-6 mt-12 pt-12 border-t border-slate-100">
                  {ecosystems[activeCategory].items.slice(8).map((item) => (
                    <div key={item.id} className="w-[calc(20%-1.5rem)] min-w-[200px]">
                      <MachineHubCard item={item} horizontal />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Compliance Banner */}
            <div className="mt-8 bg-slate-900 rounded-3xl p-8 flex items-center justify-between text-white overflow-hidden relative">
              <div className="flex items-center gap-6">
                <ShieldCheck className="w-10 h-10 text-brand-primary" />
                <p className="text-[11px] font-bold text-slate-400 max-w-2xl leading-relaxed uppercase tracking-wider">
                  Industrial Grade R&D Ecosystem | Certified for Global Laboratory Deployment | ISO 9001:2015 Compliant
                </p>
              </div>
              <button className="px-8 py-3 border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all">
                Quality Certs
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const MachineHubCard = ({ item, reverse = false, horizontal = false }) => (
  <div className={`group flex ${horizontal ? 'flex-col items-center text-center' : reverse ? 'flex-row-reverse text-right' : 'flex-row'} gap-4 transition-all`}>
    <div className={`w-24 h-24 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center p-3 group-hover:border-brand-primary group-hover:scale-105 transition-all duration-500 shrink-0`}>
      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
    </div>
    <div className={`flex flex-col justify-center min-w-0 flex-grow ${horizontal ? 'items-center mt-3' : ''}`}>
      <div className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1">{item.code}</div>
      <h4 className="text-[11px] font-black text-slate-900 uppercase leading-tight mb-1 group-hover:text-brand-primary transition-colors line-clamp-2">
        {item.name}
      </h4>
      <div className={`flex flex-col ${reverse ? 'items-end' : horizontal ? 'items-center' : 'items-start'}`}>
        {(item.specs || []).slice(0, 1).map((s, i) => (
          <div key={i} className="text-[8px] font-bold text-slate-400 uppercase tracking-tight opacity-70">
            {s.split(':')[1] || s}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CatalogPage;
