import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  ArrowLeft, ArrowRight, ChevronRight, Mail, Phone, MapPin, Send,
  Globe, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Activity, Settings, Factory,
  Search, Menu, X as CloseIcon, BarChart3, FlaskConical, Wrench
} from 'lucide-react';

// --- Social Icons ---
const LinkedInIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>);
const YoutubeIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>);
const InstagramIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>);
const FacebookIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>);

import ProductEcosystem from './components/ProductEcosystem';
import MaterialNavigation from './components/MaterialNavigation';
import MagneticFieldHero from './components/MagneticFieldHero';
import Container from './components/Container';
import Navbar from './components/Navbar';
import CatalogPage from './pages/Catalog';
import BlogPage from './pages/BlogPage';
import BlogDetail from './pages/BlogDetail';
import ContactPage from './pages/ContactPage';
import { productCategories, coreProducts } from './data/materials.jsx';

// Container and Navbar extracted to separate files

// --- Hero (Upgraded: Magnetic Field Backdrop) ---
const Hero = ({ onNavigate }) => (
  <MagneticFieldHero>
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="lg:-translate-x-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-slate-900 rounded-full mb-10 shadow-xl shadow-slate-900/10">
            <div className="w-2 h-2 bg-brand-light rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Advanced R&D Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] font-black text-slate-900 leading-[0.85] mb-10 tracking-tighter">
            Energizing <br />
            <span className="text-brand-primary">Innovation</span>
          </h1>
          <p className="text-base md:text-xl text-slate-700 max-w-xl mb-12 leading-relaxed font-bold">
            DAS Energy's is the global leader in providing next-generation fabrication equipment for battery, fuel cell, and solar research.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#ecosystem" className="px-10 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-brand-primary/30 flex items-center gap-4">
              Explore Lines <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#products" className="px-10 py-4 border-4 border-slate-100 text-slate-700 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-brand-primary transition-all">
              Our Catalog
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative lg:translate-x-10 lg:translate-y-6">
          {/* Floating QR Code */}
          <div className="absolute -top-12 -right-8 z-20 hidden xl:block">
            <button 
              onClick={() => onNavigate('contact')}
              className="p-3 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-brand-primary/20 shadow-2xl hover:scale-110 transition-transform cursor-pointer group block"
            >
              <img src="/qrcode.svg" alt="Scan QR Code" className="w-20 h-20 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="mt-2 text-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-primary">Get in Touch</span>
              </div>
            </button>
          </div>

          <div className="relative z-10 p-4 md:p-6 bg-white/40 backdrop-blur-md rounded-[40px] md:rounded-[60px] shadow-4xl border-4 border-white/20 overflow-hidden group">
            <div className="absolute inset-0 bg-brand-soft opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
            <img src="/front.svg" alt="Featured Technology" className="w-full h-full object-contain animate-float drop-shadow-3xl" />
          </div>
        </motion.div>
      </div>
    </Container>
  </MagneticFieldHero>
);

// --- Services (New Upgraded Section) ---
const Services = () => (
  <section className="pt-12 pb-12 bg-white" id="services">
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-10">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-10">
          {[
            { t: "Research", d: "High-accuracy instrumentation for energy breaks.", i: <Zap />, c: "bg-white" },
            { t: "Industrial", d: "Scalable production for next-gen gigafactories.", i: <Factory />, c: "bg-brand-primary text-white" },
            { t: "Custom", d: "Tailored process automation for unique needs.", i: <Settings />, c: "bg-white" },
            { t: "Technical", d: "24/7 technical consultancy and maintenance.", i: <Activity />, c: "bg-white" }
          ].map((item, i) => (
            <div key={i} className={`p-4 md:p-10 rounded-2xl md:rounded-[32px] border-2 md:border-4 border-slate-200 shadow-xl flex flex-col h-full ${item.c}`}>
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-8 ${item.c.includes('primary') ? 'bg-white text-brand-primary shadow-2xl' : 'bg-brand-soft text-brand-primary'}`}>
                {item.i}
              </div>
              <h4 className="font-black text-sm md:text-2xl mb-2 md:mb-4 tracking-tighter uppercase">{item.t}</h4>
              <p className={`text-[10px] md:text-sm font-bold leading-tight md:leading-relaxed ${item.c.includes('primary') ? 'opacity-80' : 'text-slate-500'}`}>{item.d}</p>
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
          <div className="flex flex-wrap items-center gap-10 py-10 border-t-2 border-slate-200">
            <div><div className="text-4xl font-black text-slate-900">15+</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Years of Tech</div></div>
            <div><div className="text-4xl font-black text-slate-900">Global</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Certified Presence</div></div>
            <div><div className="text-4xl font-black text-slate-900">Reliable</div><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Performance</div></div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

// --- Trusted Partners (Premium Carousel) ---
const TrustedPartners = () => {
  const logos = [
    { src: '/IIT DELHI.svg', alt: 'IIT Delhi' },
    { src: '/IIT BANGALORE.svg', alt: 'IIT Bangalore' },
    { src: '/RAJALAKSHMI ENGINEERING COLLEGE.svg', alt: 'Rajalakshmi Engineering College' },
    { src: '/CALICUT UNIVERSITY.svg', alt: 'Calicut University' },
    { src: '/ANNA UNIVERSITY.svg', alt: 'Anna University' },
    { src: '/IIT BOMBAY.svg', alt: 'IIT Bombay' },
    { src: '/SATYABAMA UNIVERSITY.svg', alt: 'Satyabama University' },
    { src: '/VELS.svg', alt: 'Vels' },
    { src: '/IIT PALAKKAD.svg', alt: 'IIT Palakkad' },
    { src: '/IIT MADRAS.svg', alt: 'IIT Madras' },
    { src: '/IIT KOTTAYAM.svg', alt: 'IIT Kottayam' },
    { src: '/IIT KHARAGPUR.svg', alt: 'IIT Kharagpur' },
    { src: '/GOA.svg', alt: 'Goa University' },
    { src: '/SSN.svg', alt: 'SSN College' },
    { src: '/CAPLIN.svg', alt: 'Caplin Point' },
    { src: '/SAVEETHA.svg', alt: 'Saveetha University' },
    { src: '/KOSEI.svg', alt: 'Kosei Minda' },
    { src: '/ISMAT.svg', alt: 'Ismat' },
    { src: '/DRDO.svg', alt: 'DRDO' },
    { src: '/EPSILON.svg', alt: 'Epsilon Carbon' },
    { src: '/MINDA.svg', alt: 'Minda' },
    { src: '/BHOPAL.svg', alt: 'IIT Bhopal' },
    { src: '/MKU.svg', alt: 'Madurai Kamaraj University' },
  ];

  return (
    <section className="pt-12 pb-0 bg-white overflow-hidden relative" id="partners">
      <div className="text-center max-w-4xl mx-auto mb-8 px-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">
          Trusted by <span className="text-brand-primary">Industry Leaders</span>
        </h2>
        <p className="text-lg text-slate-500 font-bold">
          Accelerating global energy innovation through strategic partnerships.
        </p>
      </div>

      <div className="relative overflow-hidden w-full py-6">
        {/* Edge Fades for Seamless Look */}

        <motion.div
          className="flex items-center gap-8 md:gap-16 w-max will-change-transform transform-gpu"
          animate={{ x: ["0%", "-33.333%"] }}
          style={{ backfaceVisibility: 'hidden', perspective: 1000 }}
          transition={{ repeat: Infinity, duration: 150, ease: "linear" }}
        >
          {/* Triple the logos for a truly seamless full-width infinite scroll */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white border-2 border-slate-100 rounded-3xl shadow-sm hover:border-brand-primary hover:shadow-md hover:scale-105 transition-all duration-500 cursor-pointer p-2 md:p-4 hover:z-20 relative"
            >
              <img src={logo.src} alt={logo.alt} className="h-24 md:h-40 object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- Product Grid (Now Globally Filtered) ---
const ProductGrid = ({ searchTerm }) => {
  const filteredProducts = coreProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="pt-2 md:pt-6 pb-6 bg-brand-soft/30 relative overflow-hidden" id="products">
      {/* Subtle Technical Backdrop Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-brand-primary/10 rounded-full blur-[100px] -z-10" />

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

                    <button 
                      onClick={() => onNavigate('/contact')}
                      className="w-full py-2.5 bg-brand-dark text-white rounded-md text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-primary transition-all text-center cursor-pointer"
                    >
                      Inquire Spec
                    </button>
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

// --- Blog (Home Page Preview) ---
const Blog = ({ onNavigate, onSelectPost }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://cdn.contentful.com/spaces/lmooxhcoosfx/environments/master/entries?access_token=hLrd9mzbdWE0cJgY1SWkV_dYY49tJUW7whB8UluzaY0&content_type=blogPost&include=2`
        );
        const data = await response.json();

        if (data.items) {
          const assets = data.includes?.Asset || [];
          const formattedPosts = data.items.map(item => {
            const imageId = item.fields.featuredImage?.sys.id;
            const asset = assets.find(a => a.sys.id === imageId);
            const imageUrl = asset ? `https:${asset.fields.file.url}` : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800";

            return {
              id: item.sys.id,
              title: item.fields.title,
              date: new Date(item.fields.date).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              }),
              description: item.fields.content.length > 150
                ? item.fields.content.substring(0, 150) + "..."
                : item.fields.content,
              fullContent: item.fields.content,
              category: "Technical Paper",
              image: imageUrl
            };
          });
          setPosts(formattedPosts.slice(0, 3)); // Only show latest 3 on home
        }
      } catch (err) {
        console.error("Failed to fetch blog posts from Contentful:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="py-10 bg-slate-50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-10">
          <div className="max-w-2xl">
            <span className="section-tag">Technical Insights</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">R&D <br /><span className="text-brand-primary">Knowledge</span> Hub</h2>
          </div>
          <div className="text-right">
            <p className="text-lg text-slate-500 font-bold max-w-sm mb-4">Deep dives into the latest energy fabrication technologies.</p>
            <button 
              onClick={() => onNavigate('blog')}
              className="text-brand-primary font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all ml-auto"
            >
              View All Posts <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/50 rounded-[32px] h-[450px] animate-pulse border-2 border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? posts.map((p) => (
              <motion.article
                key={p.id}
                onClick={() => onNavigate(`/blog/${p.id}`, p)}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[32px] overflow-hidden border-2 border-transparent hover:border-brand-primary transition-all shadow-xl shadow-slate-200/40 flex flex-col h-full cursor-pointer"
              >
                <div className="h-44 md:h-52 overflow-hidden relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary">
                    {p.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{p.date}</div>
                  <h4 className="text-xl font-black mb-2 text-slate-900 tracking-tighter leading-tight group-hover:text-brand-primary transition-colors">{p.title}</h4>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed mb-4 flex-grow line-clamp-3">{p.description}</p>
                  <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-brand-primary group-hover:gap-5 transition-all">
                    Read Analysis <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            )) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No technical insights published yet.</p>
              </div>
            )}
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
    organization: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Using EmailJS for free automated replies
      await emailjs.send(
        "service_dtndzzg",
        "template_qvy4hoi",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          message: formData.message,
        },
        "oDh6XUPhF-88EhnDM"
      );

      setStatus("success");
      setFormData({ name: "", phone: "", email: "", organization: "", message: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-10 bg-slate-50" id="contact">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Inquiry Form Dashboard */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100">
            <span className="section-tag mb-4">Direct Inquiry</span>
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900 leading-tight uppercase tracking-tighter">Request <span className="text-brand-primary">Technical</span> Quote</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* SplitForms Honeypot (Hidden) */}
              <input type="text" name="_gotcha" style={{ display: "none" }} />
              
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
                    name="organization"
                    value={formData.organization}
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

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-4 bg-brand-soft rounded-xl border border-brand-primary/20 mt-4"
                  >
                    <p className="text-[11px] font-black text-brand-primary uppercase tracking-widest flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Inquiry Received Successfully!
                    </p>
                    <p className="text-[10px] text-brand-primary/70 mt-1">Our technical team will contact you shortly.</p>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center p-4 bg-rose-50 rounded-xl border border-rose-100 mt-4"
                  >
                    <p className="text-[11px] font-black text-rose-600 uppercase tracking-widest">
                      Something went wrong. Please try again.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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

            {/* Social Media Links */}
            <div className="flex gap-4 justify-center mt-6">
              <a href="https://www.facebook.com/profile.php?id=61576641674340" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-[#1877F2] hover:border-[#1877F2]/20 hover:shadow-xl transition-all duration-300">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/dasinstrumentsandsolutions/?hl=en" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-[#E4405F] hover:border-[#E4405F]/20 hover:shadow-xl transition-all duration-300">
                <InstagramIcon />
              </a>
              <a href="https://www.linkedin.com/company/das-instruments-and-solutions/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-[#0077B5] hover:border-[#0077B5]/20 hover:shadow-xl transition-all duration-300">
                <LinkedInIcon />
              </a>
              <a href="https://youtube.com/@dasinstruments?si=tJ70_f_HrQTdpxGd" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-[#FF0000] hover:border-[#FF0000]/20 hover:shadow-xl transition-all duration-300">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

// --- Footer ---
const Footer = ({ onNavigate }) => (
  <footer className="bg-gradient-to-b from-[#f0fdf4] to-[#6ee7b7] text-slate-900 pt-0 pb-12 px-8 relative overflow-hidden">
    {/* Interchanged Waves: Diagonal now at Bottom, Fluid at Top */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Fluid Wave: Right-Top to Left-Middle - Increased Visibility */}
      <svg className="absolute top-0 right-0 w-full h-full opacity-30" viewBox="0 0 1440 320" fill="none">
        <path fill="#10b981" fillOpacity="0.4" d="M1440,0 L1440,120 C1200,160 900,80 720,120 C540,160 240,240 0,160 L0,0 Z"></path>
      </svg>

      {/* Radial Shade now at Bottom - ULTRA DARK for Visible Contrast */}
      <svg className="absolute -bottom-24 -right-24 w-[120%] h-[150%] opacity-60 blur-3xl translate-x-1/4 rotate-12" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx="100" cy="100" r="80" fill="url(#footerGradInv)" />
        <defs>
          <radialGradient id="footerGradInv" cx="100%" cy="100%" r="100%">
            <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: '#000000', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
      </svg>
    </div>
    <div className="pr-4 md:pr-6 pl-0 md:pl-16">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-10">
        <div className="flex-shrink-0 flex flex-col items-start gap-0 lg:w-1/2 mt-0 md:mt-[-32px]">
          <img src="/logo_official.svg" alt="DAS Energy's Logo" className="h-32 md:h-64 mb-0" />
          <p className="text-sm md:text-lg font-bold text-slate-500 max-w-lg leading-relaxed mt-[-20px] md:mt-[-75px]">
            DAS Energy’s empowers global energy innovation with next-generation fabrication equipment for battery, fuel cell, and solar research.
          </p>
        </div>

        {/* Center: Make In India Branding */}
        <div className="flex-shrink-0 pt-0 lg:pt-12">
          <img src="/makeinindia.svg" alt="Make In India" className="h-20 md:h-32 object-contain opacity-80" />
        </div>

        <div className="flex flex-wrap gap-8 lg:gap-24 pt-6 lg:pt-16 pr-0 lg:pr-20">
          <div>
            <h5 className="font-medium text-base uppercase tracking-[0.2em] mb-6 text-emerald-600">Lines</h5>
            <ul className="space-y-3 text-[15px] font-medium text-slate-600">
              <li><a href="#ecosystem" className="hover:text-emerald-600 transition-colors">Coin Cell</a></li>
              <li><a href="#ecosystem" className="hover:text-emerald-600 transition-colors">Pouch Cell</a></li>
              <li><a href="#ecosystem" className="hover:text-emerald-600 transition-colors">Cylindrical</a></li>
              <li><a href="#ecosystem" className="hover:text-emerald-600 transition-colors">Prismatic</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-base uppercase tracking-[0.2em] mb-6 text-emerald-600">Solutions</h5>
            <ul className="space-y-3 text-[15px] font-medium text-slate-600">
              <li><a href="#services" className="hover:text-emerald-600 transition-colors">Consulting</a></li>
              <li><a href="#services" className="hover:text-emerald-600 transition-colors">Maintenance</a></li>
              <li><a href="#contact" className="hover:text-emerald-600 transition-colors">Inquiry</a></li>
              <li><button onClick={() => onNavigate('blog')} className="hover:text-emerald-600 transition-colors text-left">Technical Blog</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-emerald-200/30 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/40">© 2026 DAS Energy's. All Rights Reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-900/40">
          <button onClick={() => onNavigate('privacy')} className="hover:text-brand-primary transition-all duration-300 uppercase">Privacy Policy</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-brand-primary transition-all duration-300 uppercase">Terms of Service</button>
          <button onClick={() => onNavigate('cookies')} className="hover:text-brand-primary transition-all duration-300 uppercase">Cookie Policy</button>
          <button onClick={() => onNavigate('compliance')} className="hover:text-brand-primary transition-all duration-300 uppercase">Compliance</button>
          <button onClick={() => onNavigate('disclaimer')} className="hover:text-brand-primary transition-all duration-300 uppercase">Disclaimer</button>
        </div>
      </div>
    </div>
  </footer>
);

// --- Legal Page ---
const LegalPage = ({ type, onBack }) => {
  const content = {
    privacy: {
      title: "Privacy Policy",
      body: "DAS Energy's is committed to protecting the privacy of our research and industrial partners. We collect minimal personal data through inquiry forms solely for the purpose of providing technical quotes and equipment support. We employ industry-standard security measures, including end-to-end encryption and secure database management, to safeguard your institutional data. Your information is never sold, traded, or disclosed to third-party marketing entities without explicit consent. We comply with global data protection regulations to ensure your research privacy is maintained at every stage of collaboration."
    },
    terms: {
      title: "Terms of Service",
      body: "Use of the DAS Energy's portal is subject to our professional service standards and industrial agreements. All intellectual property, including equipment designs, technical specifications, CAD models, and branding assets, are the exclusive property of DAS Energy's. Users are prohibited from unauthorized reproduction or distribution of technical data obtained through this portal. We reserve the right to update technical specifications and service terms without prior notice to reflect engineering advancements and regulatory changes. All technical inquiries and quotes provided are subject to our final sales and distribution agreements."
    },
    cookies: {
      title: "Cookie Policy",
      body: "Our portal uses essential and performance cookies to optimize the user experience of our scientific equipment catalog and inquiry management system. These cookies allow us to maintain your search preferences, ensure secure session management, and analyze portal traffic to improve our technical content delivery. By using our site, you consent to the use of these necessary cookies. You may manage or disable cookies through your browser settings, though some functional features of the equipment catalog may be affected. We do not use tracking cookies for third-party advertising purposes."
    },
    compliance: {
      title: "Compliance Statement",
      body: "DAS Energy's operates in full compliance with international standards for scientific equipment manufacturing and distribution. We adhere to rigorous safety protocols, environmental regulations, and quality management systems (ISO 9001/14001 equivalent standards). Our manufacturing partners maintain strict certifications for electronics waste management and sustainable fabrication practices. We are committed to meeting rigorous laboratory safety protocols and ensure all equipment meets global scientific manufacturing standards before distribution."
    },
    disclaimer: {
      title: "Disclaimer",
      body: "All technical information provided on this portal is for informational purposes and is based on standard laboratory conditions and engineering simulations. Actual equipment performance may vary depending on specific research environments, material purity, and laboratory integration. DAS Energy's assumes no liability for research outcomes, project delays, or incidental damages resulting from the use of the information or equipment provided. It is the user's responsibility to verify equipment compatibility with their specific research requirements before purchase. Technical data is provided 'as is' and is subject to engineering revisions."
    }
  };

  const active = content[type] || content.privacy;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-8">
      <Container>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </button>
        <div className="bg-white border-2 border-slate-100 rounded-[40px] p-12 shadow-2xl max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-8">
            {active.title}
          </h1>
          <div className="h-1 w-24 bg-brand-primary mb-12 rounded-full" />
          <p className="text-xl text-slate-600 font-bold leading-relaxed whitespace-pre-line">
            {active.body}
          </p>
        </div>
      </Container>
    </div>
  );
};

// --- Our Associates ---
const OurAssociates = () => (
  <section className="pt-6 pb-6 bg-white border-t border-slate-100" id="associates">
    <div className="px-4 md:px-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
          Our <span className="text-brand-primary">Associates</span>
        </h2>
        <div className="h-1 w-24 bg-brand-primary mx-auto mt-4 rounded-full" />
        <p className="text-sm md:text-lg font-black text-slate-500 uppercase tracking-[0.3em] mt-6">
          WE PARTNER WITH WORLD'S BEST SCIENTIFIC EQUIPMENT MANUFACTURERS
        </p>
      </div>

      <div className="bg-white border-2 border-slate-100 rounded-[40px] shadow-[0_40px_80px_rgba(0,163,130,0.15),0_10px_25px_rgba(0,0,0,0.08)] py-8 px-6 md:px-12 mt-6 max-w-[1350px] mx-auto overflow-hidden">
        <div className="grid grid-cols-3 md:flex md:flex-nowrap justify-center items-center gap-4 md:gap-10 lg:gap-20 w-full">
          <div className="h-20 md:h-36 flex items-center justify-center p-0 rounded-xl hover:bg-brand-soft transition-colors cursor-pointer shrink-0">
            <img src="/chino.svg" alt="Chino" className="h-full object-contain scale-105" />
          </div>

          <div className="h-20 md:h-36 flex items-center justify-center p-0 rounded-xl hover:bg-brand-soft transition-colors cursor-pointer shrink-0">
            <img src="/RADBEE.svg" alt="Radbee" className="h-full object-contain scale-105" />
          </div>

          <div className="h-20 md:h-36 flex items-center justify-center p-0 rounded-xl hover:bg-brand-soft transition-colors cursor-pointer shrink-0">
            <img src="/ZX.svg" alt="ZX" className="h-full object-contain scale-105" />
          </div>

          <div className="h-20 md:h-36 flex items-center justify-center p-0 rounded-xl hover:bg-brand-soft transition-colors cursor-pointer shrink-0">
            <img src="/WUHAN.svg" alt="Wuhan" className="h-full object-contain scale-105" />
          </div>

          <div className="h-20 md:h-36 flex items-center justify-center p-0 rounded-xl hover:bg-brand-soft transition-colors cursor-pointer shrink-0">
            <img src="/BIOBASE.svg" alt="Biobase" className="h-full object-contain scale-105" />
          </div>

          <div className="h-20 md:h-36 flex items-center justify-center p-0 rounded-xl hover:bg-brand-soft transition-colors cursor-pointer shrink-0">
            <img src="/neware.svg" alt="Neware" className="h-full object-contain scale-105" />
          </div>
        </div>
      </div>
    </div>
  </section>
);function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScroll, setShowScroll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Search auto-scroll logic
  useEffect(() => {
    if (searchTerm.trim() !== "" && location.pathname === '/') {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [searchTerm, location.pathname]);

  const handleNavigate = (path, state = null, sectionId = null) => {
    const routePath = path === 'home' ? '/' : path.startsWith('/') ? path : `/${path}`;
    
    // Explicitly handle section hashes
    const finalPath = sectionId ? `${routePath}#${sectionId}`.replace('//#', '/#') : routePath;
    
    // If we're already on the target page, scroll immediately
    if (location.pathname === routePath) {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // If navigating home while already on home, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(finalPath, { state });
    }
  };

  const prevPath = React.useRef(location.pathname);

  useEffect(() => {
    // Disable automatic browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Scroll logic based on URL Hash (e.g., /#blog)
    const sectionId = location.hash.replace('#', '');
    
    if (sectionId && (location.pathname === '/' || location.pathname === '')) {
      const performScroll = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      // Multi-stage scroll to handle dynamic loading
      performScroll();
      const intervals = [100, 300, 700, 1200, 2000, 3000];
      const timers = intervals.map(ms => setTimeout(performScroll, ms));
      
      return () => timers.forEach(t => clearTimeout(t));
    } else if (location.pathname !== prevPath.current) {
      window.scrollTo(0, 0);
    }
    
    prevPath.current = location.pathname;
  }, [location.pathname, location.hash]);

  return (
    <Routes>
      <Route path="/" element={
        <HomePage 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onNavigate={handleNavigate}
          showScroll={showScroll}
        />
      } />
      <Route path="/catalog" element={<CatalogPage onBack={() => handleNavigate('/', null, 'ecosystem')} onNavigate={handleNavigate} />} />
      <Route path="/blog" element={
        <BlogPage 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onBack={() => handleNavigate('/', null, 'blog')} 
          onNavigate={handleNavigate}
        />
      } />
      <Route path="/blog/:id" element={
        <BlogDetail 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onBack={() => handleNavigate('/', null, 'blog')} 
          onNavigate={handleNavigate}
        />
      } />
      <Route path="/contact" element={<ContactPage onBack={() => handleNavigate('/')} onNavigate={handleNavigate} />} />
      
      {['privacy', 'terms', 'cookies', 'compliance', 'disclaimer'].map(type => (
        <Route key={type} path={`/${type}`} element={<LegalPage type={type} onBack={() => handleNavigate('/')} />} />
      ))}
    </Routes>
  );
}

const HomePage = ({ searchTerm, setSearchTerm, onNavigate, showScroll }) => (
  <div className="bg-white selection:bg-brand-primary selection:text-white scroll-smooth relative">
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onNavigate={onNavigate} />
    <main>
      <Hero onNavigate={onNavigate} />
      <About />
      <TrustedPartners />
      <div id="ecosystem">
        <ProductEcosystem onOpenCatalog={() => onNavigate('/catalog')} />
      </div>
      <ProductGrid searchTerm={searchTerm} />

      <section className="pt-10 pb-0 bg-white border-t border-slate-100" id="materials">
        <Container>
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-xl md:text-2xl font-black uppercase tracking-[0.4em] text-brand-primary mb-4 block">
              [ Component Ecosystem ]
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 text-slate-900 uppercase tracking-tighter">
              We <span className="text-brand-primary">provide</span> Battery <span className="text-brand-primary">Materials</span>
            </h2>
            <p className="text-xl text-slate-500 font-bold">Raw materials and components for batteries, super capacitors, and fuel cell technologies.</p>
          </div>
          <MaterialNavigation />
        </Container>
      </section>

      <Services />
      <OurAssociates />
      <div id="blog">
        <Blog onNavigate={onNavigate} />
      </div>
      <Contact />
    </main>
    <Footer onNavigate={onNavigate} />

    {/* Floating Buttons */}
    <div className="fixed bottom-8 right-8 z-[500] flex flex-col gap-4">
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

export default App;
