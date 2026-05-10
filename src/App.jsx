import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ChevronRight, Mail, Phone, MapPin, Send,
  Globe, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Activity, Settings, Factory,
  Search, Menu, X as CloseIcon, BarChart3, FlaskConical, Wrench
} from 'lucide-react';
import ProductEcosystem from './components/ProductEcosystem';
import MaterialNavigation from './components/MaterialNavigation';
import CatalogPage from './pages/Catalog';
import { productCategories, coreProducts } from './data/materials.jsx';

// --- Shared Components ---
const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const element = document.getElementById(`product-${name.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b-2 border-emerald-200 shadow-lg py-1.5' : 'bg-transparent border-b border-brand-primary/20 shadow-none py-2 md:py-4'}`}>
      <div className={`w-full px-8 md:px-24 flex items-center h-full transition-all duration-500 ${isScrolled ? 'justify-start gap-10 md:gap-20' : 'justify-between'}`}>
        <div className="relative w-32 md:w-48 h-12 flex items-center">
          <a href="/" className="absolute top-1/2 -translate-y-1/2 left-0 z-50 transition-all duration-500">
            <img 
              src="/logo_official.png" 
              alt="DAS Energy's Logo" 
              className={`object-contain mix-blend-multiply transition-all duration-500 drop-shadow-xl ${isScrolled ? 'h-24 md:h-36' : 'h-32 md:h-56'}`}
            />
          </a>
        </div>

        {/* Dynamic Navigation Links (Move to left on scroll) */}
        <div className={`hidden lg:flex gap-3 transition-all duration-500 ${!isScrolled ? 'order-2' : 'order-1'}`}>
          {['About', 'Ecosystem', 'Products', 'Services', 'Blog', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`nav-badge transition-all duration-500 ${isScrolled ? 'text-[10px] px-3 py-1' : 'text-[12px] px-5 py-2'}`}>
              {item}
            </a>
          ))}
        </div>

        <div className={`flex items-center gap-6 transition-all duration-500 ${!isScrolled ? 'order-3' : 'order-2 ml-auto'}`}>
          {/* Futuristic High-Intelligence Global Search */}
          <div className="relative max-w-[400px]">
            <motion.div className="relative group w-full">
              <div className={`relative flex items-center bg-white border-2 rounded-2xl px-5 py-2 w-full transition-all duration-300 ${isFocused ? 'border-brand-primary shadow-sm' : 'border-emerald-100'}`}>
                <Search className={`w-4 h-4 mr-3 transition-colors ${isFocused ? 'text-brand-primary' : 'text-slate-400'}`} />
                <input 
                  type="text"
                  value={searchTerm}
                  onFocus={() => { setIsFocused(true); setShowSuggestions(true); }}
                  onBlur={() => setTimeout(() => { setIsFocused(false); setShowSuggestions(false); }, 200)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                    if (e.target.value.length > 0) {
                      const element = document.getElementById('products');
                      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  placeholder="Search R&D Equipments..."
                  className={`bg-transparent w-full outline-none placeholder:text-slate-400 uppercase tracking-[0.1em] transition-all duration-500 font-medium text-slate-900 ${isScrolled ? 'text-[10px]' : 'text-[12px]'}`}
                />
                
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      onClick={() => setSearchTerm("")}
                      className="ml-2 text-slate-400 hover:text-slate-900"
                    >
                      <CloseIcon className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showSuggestions && searchTerm.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl rounded-3xl border-2 border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0)] overflow-hidden z-[2000]"
                  >
                    {suggestions.length > 0 ? (
                      <div className="p-2">
                        {suggestions.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleSuggestionClick(p.name)}
                            className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group text-left border-b border-slate-50 last:border-0"
                          >
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-primary group-hover:bg-brand-soft transition-colors">
                              {p.icon}
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{p.code}</div>
                              <div className="text-sm font-bold text-slate-900 group-hover:text-brand-primary">
                                {p.name.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) => (
                                  part.toLowerCase() === searchTerm.toLowerCase() 
                                    ? <span key={i} className="text-brand-primary bg-brand-soft px-0.5">{part}</span>
                                    : <span key={part+i}>{part}</span>
                                ))}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Search className="w-10 h-10 text-slate-100 mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No equipment found</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <a href="#contact" className={`hidden sm:block bg-brand-primary text-white rounded-full font-medium uppercase tracking-[0.1em] hover:bg-slate-900 transition-all duration-500 shadow-xl shadow-brand-primary/20 whitespace-nowrap ${isScrolled ? 'px-5 py-2 text-[10px]' : 'px-8 md:px-10 py-3 text-[12px]'}`}>
            Get Quote
          </a>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-3 bg-white rounded-xl text-slate-900 shadow-sm border border-emerald-100">
            {isMobileMenuOpen ? <CloseIcon /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b-4 border-brand-primary shadow-2xl p-8 flex flex-col gap-6 font-black text-xs uppercase tracking-widest text-slate-900"
          >
            {['About', 'Ecosystem', 'Products', 'Services', 'Blog', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary">{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero (Upgraded: Dynamic Backdrop) ---
const Hero = () => (
  <section className="relative pt-48 pb-12 md:pt-64 md:pb-16 bg-white overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute top-20 right-[-10%] w-[50%] h-[80%] bg-brand-soft rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
    <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-slate-50 rounded-full blur-[120px] opacity-40" />

    <Container className="relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-slate-900 rounded-full mb-10 shadow-xl shadow-slate-900/10">
            <div className="w-2 h-2 bg-brand-light rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Advanced R&D Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-slate-900 leading-[0.85] mb-10 tracking-tighter">
            Energizing <br />
            <span className="text-brand-primary">Innovation</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 max-w-xl mb-14 leading-relaxed font-bold">
            DAS Energy's is the global leader in providing next-generation fabrication equipment for battery, fuel cell, and solar research.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#ecosystem" className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-brand-primary/30 flex items-center gap-4">
              Explore Lines <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#products" className="px-12 py-5 border-4 border-slate-100 text-slate-700 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-brand-primary transition-all">
              Our Catalog
            </a>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
          <div className="relative z-10 p-12 md:p-20 bg-white rounded-[64px] shadow-4xl border-4 border-slate-50 overflow-hidden group">
            <div className="absolute inset-0 bg-brand-soft opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
            <img src="/coin_cell.svg" alt="Featured Instrument" className="w-full h-full object-contain animate-float drop-shadow-3xl" />
          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

// --- Services (New Upgraded Section) ---
const Services = () => (
  <section className="pt-24 pb-12 bg-white" id="services">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
        <div className="max-w-2xl">
          <span className="section-tag">Enterprise Services</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">Comprehensive <br /><span className="text-brand-primary">Support</span> & Consulting</h2>
        </div>
        <p className="text-lg text-slate-500 font-bold max-w-sm">Beyond equipment, we provide the expertise to accelerate your energy breakthroughs.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { t: "Lab Consulting", d: "Expert advice on setting up state-of-the-art research labs.", i: <FlaskConical /> },
          { t: "Custom Fabrication", d: "Bespoke engineering solutions tailored to your unique goals.", i: <Settings /> },
          { t: "Global Maintenance", d: "Worldwide support with 24/7 priority response times.", i: <Wrench /> }
        ].map((s, i) => (
          <div key={i} className="p-8 rounded-[32px] bg-slate-50 border-2 border-transparent hover:border-brand-primary transition-all group flex gap-6 items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-lg group-hover:scale-110 transition-transform shrink-0">
              {s.i}
            </div>
            <div>
              <h4 className="text-xl font-black mb-2 text-slate-900 tracking-tight leading-tight">{s.t}</h4>
              <p className="text-slate-500 font-bold text-xs leading-relaxed">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// --- About ---
const About = () => (
  <section className="pt-12 pb-12 bg-slate-50" id="about">
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {[
            { t: "Research", d: "High-accuracy instrumentation for energy breaks.", i: <Zap />, c: "bg-white" },
            { t: "Industrial", d: "Scalable production for next-gen gigafactories.", i: <Factory />, c: "bg-brand-primary text-white" },
            { t: "Custom", d: "Tailored process automation for unique needs.", i: <Settings />, c: "bg-white sm:mt-[-30px]" },
            { t: "Technical", d: "24/7 technical consultancy and maintenance.", i: <Activity />, c: "bg-white" }
          ].map((item, i) => (
            <div key={i} className={`p-10 rounded-[32px] border-4 border-slate-200 shadow-xl ${item.c}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${item.c.includes('primary') ? 'bg-white text-brand-primary shadow-2xl' : 'bg-brand-soft text-brand-primary'}`}>
                {item.i}
              </div>
              <h4 className="font-black text-2xl mb-4 tracking-tighter">{item.t}</h4>
              <p className={`text-sm font-bold leading-relaxed ${item.c.includes('primary') ? 'opacity-80' : 'text-slate-500'}`}>{item.d}</p>
            </div>
          ))}
        </div>
        
        <div>
          <span className="section-tag">Our Identity</span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-10 leading-[0.9] tracking-tighter uppercase">
            Pioneering the <br /> 
            <span className="text-brand-primary">Precision</span> Era
          </h2>
          <div className="flex items-center gap-6 mb-10">
            <div className="w-16 h-1 bg-brand-primary rounded-full" />
            <p className="text-xl text-slate-700 leading-relaxed font-bold mb-0">
              DAS Energy's is committed to advancing the boundaries of energy research through world-class instrumentation.
            </p>
          </div>
          <p className="text-lg text-slate-500 mb-12 leading-relaxed">
            Based in Chennai, we support a global network of universities and national laboratories. We believe in providing bespoke technical solutions that bridge the gap between academic research and industrial manufacturing.
          </p>
          <div className="flex items-center gap-10 py-10 border-t-2 border-slate-200">
            <div><div className="text-4xl font-black text-slate-900">15+</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Years of Tech</div></div>
            <div><div className="text-4xl font-black text-slate-900">Global</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Certified Presence</div></div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

// --- Product Grid (Now Globally Filtered) ---
const ProductGrid = ({ searchTerm }) => {
  const filteredProducts = coreProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 bg-emerald-50/30 relative overflow-hidden" id="products">
      {/* Subtle Technical Backdrop Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-100/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-emerald-100/20 rounded-full blur-[100px] -z-10" />
      
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-24">
          <span className="section-tag">Scientific Catalog</span>
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 uppercase tracking-tighter">
            R&D <span className="text-brand-primary">Equipments</span>
          </h2>
          <p className="text-2xl text-slate-600 font-bold mb-12">High-performance instrumentation engineered for extreme accuracy.</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, i) => (
                <motion.div 
                  key={product.id}
                  id={`product-${product.name.replace(/\s+/g, '-').toLowerCase()}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }} 
                  className="bg-white p-4 rounded-[20px] border-2 border-slate-100 shadow-[0_8px_20px_rgba(16,185,129,0.04)] flex flex-col h-full hover:border-brand-primary hover:shadow-[0_20px_40px_rgba(16,185,129,0.08)] transition-all group overflow-hidden relative"
                >
                  <div className="aspect-square bg-slate-50 rounded-lg p-3 mb-3 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-all duration-500 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[7px] font-black text-brand-primary uppercase tracking-[0.2em]">{product.code}</span>
                      <div className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-brand-primary transition-colors" />
                    </div>
                    
                    <h3 className="text-base font-black mb-1 text-slate-900 tracking-tight leading-tight group-hover:text-brand-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    <p className="text-slate-500 text-[10px] mb-3 flex-grow leading-relaxed font-bold opacity-80 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="pt-2 border-t border-slate-50 flex justify-between items-center mb-4">
                      <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Performance</span>
                      <span className="text-[7px] font-black text-slate-900 uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded-sm">
                        {product.specs}
                      </span>
                    </div>
 
                    <a href="#contact" className="w-full py-2.5 bg-emerald-900 text-white rounded-md text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-primary transition-all text-center">
                      Inquire Spec
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="text-slate-300 mb-6 flex justify-center">
                  <Search className="w-20 h-20 opacity-20" />
                </div>
                <h3 className="text-3xl font-black text-slate-400 uppercase tracking-tighter">No equipment found</h3>
                <p className="text-slate-400 font-bold mt-2">Try searching for another term like "Vacuum" or "Furnace"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

// --- Blog (Dynamic Section) ---
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a fetch from an external source/CMS
    const fetchPosts = async () => {
      try {
        // You can replace this with your actual API endpoint later
        const response = await import('./data/blogPosts.json');
        setPosts(response.default);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setTimeout(() => setLoading(false), 800); // Slight delay for smooth animation
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="pt-12 pb-32 bg-slate-50" id="blog">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <span className="section-tag">Technical Insights</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">R&D <br /><span className="text-brand-primary">Knowledge</span> Hub</h2>
          </div>
          <p className="text-lg text-slate-500 font-bold max-w-sm">Deep dives into the latest energy fabrication technologies and material research.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/50 rounded-[32px] h-[450px] animate-pulse border-2 border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p, i) => (
              <motion.div 
                key={p.id || i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-[32px] overflow-hidden border-2 border-transparent hover:border-brand-primary transition-all shadow-xl shadow-slate-200/40 flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img src={p.img} alt={p.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary">
                    {p.cat}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{p.date}</div>
                  <h4 className="text-2xl font-black mb-4 text-slate-900 tracking-tighter leading-tight group-hover:text-brand-primary transition-colors">{p.t}</h4>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 flex-grow">{p.d}</p>
                  <a href="#" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-brand-primary group-hover:gap-5 transition-all">
                    Read Analysis <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

// --- Contact (Upgraded: Symmetrical Map Integration) ---
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    university: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // NOTE: To make this functional, link to a service like EmailJS or Web3Forms
    // For now, we simulate the submission to balamuruganprabakar@gmail.com
    setTimeout(() => {
      console.log("Inquiry sent to balamuruganprabakar@gmail.com:", formData);
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", university: "", message: "" });
      setTimeout(() => setStatus(""), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-12 bg-slate-50" id="contact">
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Inquiry Form Dashboard */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100">
          <span className="section-tag mb-4">Direct Inquiry</span>
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 leading-tight uppercase tracking-tighter">Request <span className="text-brand-primary">Technical</span> Quote</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-2">Full Name</label>
                <input 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  type="text" placeholder="Your Name" className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-brand-primary focus:bg-white outline-none text-sm text-slate-600 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-2">Phone Number</label>
                <input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  type="tel" placeholder="+91 00000 00000" className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-brand-primary focus:bg-white outline-none text-sm text-slate-600 transition-all" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-2">Email Address</label>
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email" placeholder="research@university.edu" className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-brand-primary focus:bg-white outline-none text-sm text-slate-600 transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-2">Organization</label>
                <input 
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  type="text" placeholder="IIT Madras / R&D Lab" className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-brand-primary focus:bg-white outline-none text-sm text-slate-600 transition-all" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-2">Message / Requirements</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="3" placeholder="How can we help you?" className="w-full px-5 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:border-brand-primary focus:bg-white outline-none text-sm text-slate-600 transition-all"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "sending"}
              className="w-full py-4 bg-brand-primary text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 disabled:bg-slate-400"
            >
              {status === "sending" ? "Processing..." : status === "success" ? "Inquiry Sent!" : <>Send Inquiry <Send className="w-4 h-4" /></>}
            </button>
            
            {status === "success" && (
              <p className="text-center text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-4">Thank you! Your quote request has been routed.</p>
            )}
          </form>
        </div>

        {/* Right Side: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 md:p-6 rounded-[24px] shadow-xl shadow-slate-200/40 border border-slate-100 flex gap-4 items-center group hover:border-brand-primary transition-all duration-300">
            <div className="w-12 h-12 bg-brand-soft rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all flex-shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Our Location</div>
              <div className="text-sm font-bold text-slate-900 leading-tight">No: 15, Balaji Nagar, North Malayambakkam,  Chennai - 600 123.</div>
            </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-[24px] shadow-xl shadow-slate-200/40 border border-slate-100 flex gap-4 items-center group hover:border-brand-primary transition-all duration-300">
            <div className="w-12 h-12 bg-brand-soft rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email Address</div>
              <div className="text-sm font-bold text-slate-900">info.dasenergys@gmail.com</div>
            </div>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-[24px] shadow-xl shadow-slate-200/40 border border-slate-100 flex gap-4 items-center group hover:border-brand-primary transition-all duration-300">
            <div className="w-12 h-12 bg-brand-soft rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Technical Support</div>
              <div className="text-sm font-bold text-slate-900">+91 88072 43902</div>
            </div>
          </div>

          {/* Interactive Map Card */}
          <div className="bg-white p-3 rounded-[24px] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden h-[200px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.010130619079!2d80.0833267!3d13.0350267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b00697c98f5%3A0x651447dc108f4023!2sDas%20Instruments%20and%20Solutions!5e0!3m2!1sen!2sin!4v1715252814838!5m2!1sen!2sin" 
              width="100%" height="100%" style={{ border: 0, borderRadius: '16px' }} allowFullScreen="" loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </Container>
  </section>
  );
};

// --- Footer ---
const Footer = () => (
  <footer className="bg-slate-950 text-white py-40 px-8">
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
        <div className="col-span-1">
          <img src="/logo_official.png" alt="DAS Energy's Logo" className="h-24 mb-12 brightness-0 invert" />
          <p className="text-xl opacity-40 max-w-xs leading-relaxed font-bold">Leading the transition to a sustainable future through precision energy research.</p>
        </div>
        <div>
          <h5 className="font-black text-[12px] uppercase tracking-[0.4em] mb-12 text-brand-light">Lines</h5>
          <ul className="space-y-6 text-lg font-bold opacity-50">
            <li><a href="#ecosystem" className="hover:text-brand-primary transition-colors">Coin Cell</a></li>
            <li><a href="#ecosystem" className="hover:text-brand-primary transition-colors">Pouch Cell</a></li>
            <li><a href="#ecosystem" className="hover:text-brand-primary transition-colors">Cylindrical</a></li>
            <li><a href="#ecosystem" className="hover:text-brand-primary transition-colors">Prismatic</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-black text-[12px] uppercase tracking-[0.4em] mb-12 text-brand-light">Solutions</h5>
          <ul className="space-y-6 text-lg font-bold opacity-50">
            <li><a href="#services" className="hover:text-brand-primary transition-colors">Consulting</a></li>
            <li><a href="#services" className="hover:text-brand-primary transition-colors">Maintenance</a></li>
            <li><a href="#blog" className="hover:text-brand-primary transition-colors">Knowledge Hub</a></li>
            <li><a href="#about" className="hover:text-brand-primary transition-colors">Our Story</a></li>
            <li><a href="#contact" className="hover:text-brand-primary transition-colors">Inquiry</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-black text-[12px] uppercase tracking-[0.4em] mb-12 text-brand-light">HQ</h5>
          <p className="text-xl font-bold opacity-40 leading-loose">
            Tamil Nadu – 600100 <br />
            India <br />
            <span className="text-brand-light mt-6 block">info@dasenergy.com</span>
          </p>
        </div>
      </div>
      <div className="mt-40 pt-16 border-t-2 border-white/5 flex flex-wrap justify-between items-center opacity-30 gap-10">
        <p className="text-xs font-black uppercase tracking-widest">© 2026 DAS Energy's. Built for Excellence.</p>
        <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Compliance</a>
          <a href="#" className="hover:text-white transition-colors">Logistics</a>
        </div>
      </div>
    </Container>
  </footer>
);

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState('home'); // 'home' or 'catalog'

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  if (view === 'catalog') {
    return <CatalogPage onBack={() => setView('home')} />;
  }

  return (
    <div className="bg-white selection:bg-brand-primary selection:text-white scroll-smooth relative">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        <Hero />
        <About />
        <div id="ecosystem">
          <ProductEcosystem onOpenCatalog={() => setView('catalog')} />
        </div>
        <ProductGrid searchTerm={searchTerm} />
        
        {/* New Battery Materials Section - Placed after Products */}
        <section className="pt-24 pb-0 bg-white border-t border-slate-100" id="materials">
          <Container>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <span className="text-xl md:text-2xl font-black uppercase tracking-[0.4em] text-brand-primary mb-4 block">
                [ Component Ecosystem ]
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 uppercase tracking-tighter whitespace-nowrap">
                We <span className="text-brand-primary">provide</span> Battery <span className="text-brand-primary">Materials</span>
              </h2>
              <p className="text-xl text-slate-500 font-bold">Raw materials and components for batteries, super capacitors, and fuel cell technologies.</p>
            </div>
            <MaterialNavigation />
          </Container>
        </section>

        <Services />
        <Blog />
        <Contact />
      </main>
      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-[500] flex flex-col gap-4">
        {/* Scroll Top */}
        <AnimatePresence>
          {showScroll && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 bg-white border-2 border-slate-200 text-slate-900 rounded-full flex items-center justify-center shadow-xl hover:bg-slate-900 hover:text-white transition-all group"
            >
              <ArrowRight className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/918807243902" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce-slow"
        >
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;
