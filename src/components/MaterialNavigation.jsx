import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const materialData = [
  { 
    id: 'cathodes', 
    label: 'Cathodes', 
    color: '#FBBF24', // Yellow/Gold
    items: ['NMC', 'NCA', 'LCO', 'LMO'] 
  },
  { 
    id: 'anodes', 
    label: 'Anodes', 
    color: '#F97316', // Orange
    items: ['Graphite', 'CNT', 'Conductive Additives', 'Activated Carbon', 'Carbon Black', 'LTO', 'Hard Carbon'] 
  },
  { 
    id: 'separator', 
    label: 'Separator', 
    color: '#EF4444', // Red
    items: ['Poly-Ethylene', 'Poly-Propylene', 'Ceramic Coated', 'Polyimide'] 
  },
  { 
    id: 'foils', 
    label: 'Foils', 
    color: '#EC4899', // Pink
    items: ['Copper', 'Nickel', 'Aluminium', 'Etched Aluminium', 'ED Coated Cu / Ni'] 
  },
  { 
    id: 'electrolyte', 
    label: 'Electrolyte', 
    color: '#8B5CF6', // Purple
    items: ['LiPF6', 'NaPF6', 'Custom Formulations'] 
  },
  { 
    id: 'binders', 
    label: 'Binders', 
    color: '#3B82F6', // Blue
    items: ['SBR', 'PVDF', 'CMC'] 
  },
  { 
    id: 'packing', 
    label: 'Packing', 
    color: '#06B6D4', // Cyan
    items: ['Cylindrical Cans', 'Prismatic Cases', 'Al Laminate Pouch Materials'] 
  },
  { 
    id: 'tabLeads', 
    label: 'Tab-Leads', 
    color: '#14B8A6', // Teal
    items: ['Copper', 'Nickel', 'Aluminium', 'Coated Copper', 'Custom Spec Tab Leads'] 
  },
  { 
    id: 'fuelCell', 
    label: 'Fuel Cell', 
    color: '#10B981', // Green
    items: ['Catalyst', 'Nafion', 'Carbon Paper & Cloth', 'GDL', 'Gaskets', 'Cell Fixture'] 
  },
  { 
    id: 'coatedElectrode', 
    label: 'Coated Electrode', 
    color: '#84CC16', // Light Green
    items: ['Electrode Rolls', 'Electrode Sheets', 'Custom Roll / Sheet Production'] 
  }
];

const MaterialNavigation = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="w-full relative">
      {/* Global Background Blur Overlay */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[50] backdrop-blur-[12px] bg-slate-900/10 pointer-events-none"
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Desktop Grid Navigation (5x2 Layout) */}
      <div className="hidden lg:grid grid-cols-5 gap-4 px-10 relative z-[60]">
        {materialData.map((category) => (
          <div
            key={category.id}
            className={`relative ${activeCategory === category.id ? 'z-[200]' : 'z-10'}`}
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <button
              className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full transition-all duration-300 font-black text-[14px] uppercase tracking-widest shadow-lg text-white whitespace-nowrap z-[110] relative ${activeCategory === category.id ? 'scale-110 -translate-y-1' : ''}`}
              style={{ 
                backgroundColor: category.color,
                boxShadow: activeCategory === category.id 
                  ? `0 25px 50px -12px ${category.color}80` 
                  : `0 10px 20px -5px ${category.color}40`
              }}
            >
              {category.label}
              <motion.div
                animate={{ rotate: activeCategory === category.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-3 h-3" />
              </motion.div>
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
              {activeCategory === category.id && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  transition={{ 
                    duration: 0.3,
                    delay: 0.1, // Wait for button elevation to start
                    ease: "easeOut"
                  }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-6 z-[120] w-[340px]"
                >
                  <div 
                    className="bg-white rounded-[32px] border border-slate-100 shadow-2xl p-8 overflow-hidden relative"
                  >
                    
                    <div className="grid grid-cols-1 gap-2">
                      {category.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="group/item cursor-pointer relative z-10 hover:z-20"
                        >
                        {(() => {
                          const opacities = ['26', '1A', '33', '1F', '2E', '40', '14'];
                          const op = opacities[idx % opacities.length];
                          return (
                            <div 
                              className="p-5 rounded-2xl border transition-all flex items-center justify-between shadow-sm group-hover/item:shadow-md group-hover/item:bg-white"
                              style={{ 
                                backgroundColor: `${category.color}${op}`, 
                                borderColor: `${category.color}40`
                              }}
                            >
                              <span className="font-bold text-[14px] text-slate-900 uppercase tracking-wide">
                                {item}
                              </span>
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                            </div>
                          );
                        })()}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Mobile Accordion Navigation */}
      <div className="lg:hidden flex flex-col gap-3 px-4 relative z-[60]">
        {materialData.map((category) => (
          <div key={category.id} className="w-full">
            <button
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all shadow-md text-white font-black text-lg uppercase tracking-widest relative z-[110]"
              style={{ 
                backgroundColor: category.color,
                boxShadow: `0 8px 16px -4px ${category.color}30`
              }}
            >
              <span>{category.label}</span>
              <motion.div
                animate={{ rotate: activeCategory === category.id ? 180 : 0 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
            <AnimatePresence>
              {activeCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="py-4 flex flex-col gap-2">
                    {category.items.map((item, idx) => {
                      const opacities = ['26', '1A', '33', '1F', '2E', '40', '14'];
                      const op = opacities[idx % opacities.length];
                      return (
                        <div 
                          key={idx} 
                          className="p-5 rounded-xl border font-bold text-base text-slate-900 uppercase tracking-wide transition-all"
                          style={{ 
                            backgroundColor: `${category.color}${op}`,
                            borderColor: `${category.color}40`
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialNavigation;
