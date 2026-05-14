import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X as CloseIcon, Phone, Mail } from 'lucide-react';
import { coreProducts } from '../data/materials.jsx';

const Navbar = ({ searchTerm, setSearchTerm, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const suggestions = coreProducts
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 6);

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(`product-${name.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (onNavigate) onNavigate('home');
  };

  const handleNavClick = (e, item) => {
    if (onNavigate && (item === 'Blog' || item === 'Ecosystem' || item === 'Products' || item === 'Services' || item === 'About')) {
      // If it's a specific page like Blog, we might want to navigate to a view
      if (item === 'Blog') {
        onNavigate('home', null, 'blog');
        setIsMobileMenuOpen(false);
        return;
      }

      // For other items, navigate home and scroll to section
      onNavigate('home', null, item.toLowerCase());
      setIsMobileMenuOpen(false);
      return;
    }
    
    // For general clicks, just go home
    if (onNavigate) {
      onNavigate('home');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 bg-white lg:bg-transparent ${isScrolled ? 'lg:bg-white/80 lg:backdrop-blur-xl border-b-2 border-brand-primary/20 shadow-lg py-1.5' : 'border-b border-brand-primary/20 shadow-none py-2 md:py-4'}`}>
      <div className={`w-full px-4 md:px-24 flex items-center h-full transition-all duration-500 justify-between`}>
        {/* Logo Section */}
        <div className="relative w-32 md:w-64 h-12 flex items-center">
          <button onClick={() => onNavigate && onNavigate('home')} className="absolute top-1/2 -translate-y-1/2 left-0 z-50 transition-all duration-500">
            <img
              src="/logo_official.svg"
              alt="DAS Energy's Logo"
              className={`object-contain mix-blend-multiply transition-all duration-500 drop-shadow-xl ${isScrolled ? 'h-32 md:h-64' : 'h-48 md:h-96'}`}
            />
          </button>
        </div>

        {/* Desktop Navigation Links - Repositioned and resized */}
        <div className={`hidden lg:flex gap-4 transition-all duration-500 mr-auto ml-4`}>
          {['About', 'Ecosystem', 'Products', 'Services', 'Blog'].map((item) => (
            <a 
              key={item} 
              href={item === 'Blog' ? '#blog' : `#${item.toLowerCase()}`} 
              onClick={(e) => handleNavClick(e, item)}
              className={`nav-badge transition-all duration-500 font-black tracking-widest ${isScrolled ? 'text-[10px] px-4 py-1.5' : 'text-[12px] px-6 py-2'}`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 md:gap-6">
          {/* Desktop Search Bar */}
          <div className="hidden md:block relative max-w-[300px] lg:max-w-[400px]">
            <div className={`relative flex items-center bg-white border-2 rounded-2xl px-5 py-2 w-full transition-all duration-300 ${isFocused ? 'border-brand-primary shadow-sm' : 'border-brand-primary/10'}`}>
              <Search className={`w-4 h-4 mr-3 transition-colors ${isFocused ? 'text-brand-primary' : 'text-slate-400'}`} />
              <input
                type="text"
                value={searchTerm}
                onFocus={() => { setIsFocused(true); setShowSuggestions(true); }}
                onBlur={() => setTimeout(() => { setIsFocused(false); setShowSuggestions(false); }, 200)}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Equipment..."
                className="bg-transparent w-full outline-none placeholder:text-slate-400 uppercase tracking-[0.1em] font-medium text-slate-900 text-[10px] lg:text-[12px]"
              />

              <AnimatePresence>
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="ml-2 text-slate-400 hover:text-slate-900">
                    <CloseIcon className="w-4 h-4" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Suggestions */}
            <AnimatePresence>
              {showSuggestions && searchTerm.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-3xl border-2 border-slate-100 shadow-2xl overflow-hidden z-[2000] w-[350px]"
                >
                  {suggestions.map((p) => (
                    <button key={p.id} onClick={() => handleSuggestionClick(p.name)} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 text-left border-b border-slate-50 last:border-0">
                      <div className="text-sm font-bold text-slate-900">{p.name}</div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Search Toggle */}
          <button 
            onClick={() => setIsMobileSearchOpen(true)} 
            className="md:hidden w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-slate-900 shadow-sm border border-brand-primary/10 active:scale-95 transition-transform"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Get Quote (Desktop) */}
          <a 
            href="#contact" 
            onClick={(e) => { 
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home', null, 'contact');
              }
            }} 
            className="hidden sm:block bg-brand-primary text-white rounded-full font-black uppercase tracking-[0.1em] px-8 py-3 text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 whitespace-nowrap"
          >
            Get Quote
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-slate-900 shadow-sm border-2 border-slate-900 active:scale-95 transition-transform"
          >
            {isMobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-white p-6 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 relative flex items-center bg-slate-50 border-2 border-brand-primary/20 rounded-2xl px-5 py-4">
                <Search className="w-5 h-5 mr-3 text-brand-primary" />
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="SEARCH EQUIPMENT..."
                  className="bg-transparent w-full outline-none font-bold text-slate-900"
                />
              </div>
              <button onClick={() => setIsMobileSearchOpen(false)} className="p-4 bg-slate-100 rounded-2xl">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {suggestions.map((p) => (
                <button key={p.id} onClick={() => handleSuggestionClick(p.name)} className="w-full flex items-center gap-4 py-6 border-b border-slate-100 text-left">
                  <div className="w-12 h-12 bg-brand-soft rounded-xl flex items-center justify-center text-brand-primary">
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase mb-1">{p.code}</div>
                    <div className="text-lg font-black text-slate-900">{p.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="lg:hidden fixed inset-0 top-[64px] z-[9999] p-8 flex flex-col gap-8 shadow-2xl border-t border-slate-100"
            style={{ backgroundColor: '#ffffff', opacity: 1 }}
          >
            <div className="flex flex-col gap-6 font-black text-xl uppercase tracking-tighter text-slate-900">
              {['About', 'Ecosystem', 'Products', 'Services', 'Blog'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Blog' ? '#blog' : `#${item.toLowerCase()}`} 
                  onClick={(e) => handleNavClick(e, item)} 
                  className="hover:text-brand-primary active:text-brand-primary active:translate-x-2 transition-all duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <a 
                href="#contact" 
                onClick={(e) => { 
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate('home', null, 'contact');
                  }
                  setIsMobileMenuOpen(false); 
                }} 
                className="w-full py-6 bg-brand-primary text-white rounded-3xl font-black uppercase text-center text-sm tracking-widest shadow-2xl shadow-brand-primary/30 active:scale-95 active:bg-brand-dark transition-all duration-200"
              >
                Get Quote Now
              </a>

              {/* Mobile QR Code Section */}
              <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                <button 
                  onClick={() => {
                    onNavigate('home', null, 'contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-4 bg-slate-50 rounded-2xl border-2 border-brand-primary/10 flex flex-col items-center gap-2 active:scale-95 transition-transform cursor-pointer"
                >
                  <img src="/qrcode.svg" alt="Contact QR" className="w-24 h-24" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Get in Touch</span>
                </button>
                <p className="text-[10px] text-slate-400 font-bold text-center leading-relaxed">
                  Fast access to our <br /> technical support team
                </p>
              </div>

              <div className="flex justify-center gap-6 text-slate-400">
                <Phone className="w-6 h-6" />
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
