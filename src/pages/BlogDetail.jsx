import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Container from '../components/Container';

const BlogDetail = ({ post, onBack, searchTerm, setSearchTerm, onNavigate }) => {
  if (!post) return null;

  return (
    <div className="min-h-screen bg-white relative z-[500] selection:bg-brand-primary selection:text-white">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onNavigate={onNavigate} />
      
      <main className="pt-32 pb-20 bg-white">
        <Container>
          {/* Breadcrumb / Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest mb-12 hover:gap-4 transition-all group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </button>

          <article className="max-w-4xl mx-auto">
            {/* Header Section */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 bg-brand-soft text-brand-primary text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.95] mb-8">
                {post.title}
              </h1>
              
              <div className="h-2 w-32 bg-brand-primary rounded-full mb-12" />
            </header>

            {/* Featured Image - Updated to fit perfectly */}
            <div className="relative w-full rounded-[40px] overflow-hidden shadow-2xl mb-16 border-8 border-white ring-1 ring-slate-100 bg-slate-50">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto block object-contain" 
              />
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-slate prose-xl max-w-none">
                <p className="text-xl md:text-2xl text-slate-600 font-bold leading-relaxed whitespace-pre-wrap selection:bg-brand-primary selection:text-white">
                  {post.fullContent}
                </p>
              </div>

              {/* Bottom Call to Action */}
              <div className="mt-24 p-10 md:p-16 bg-slate-900 rounded-[40px] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">Want to implement these <br /><span className="text-brand-primary">technologies</span> in your lab?</h3>
                  <p className="text-slate-400 font-bold text-lg mb-10 max-w-xl">Our engineering team can help you customize fabrication lines based on your research requirements.</p>
                  <button 
                    onClick={() => onNavigate('home', null, 'contact')}
                    className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-brand-primary transition-all shadow-2xl shadow-brand-primary/20"
                  >
                    Contact Technical Support
                  </button>
                </div>
              </div>
            </div>
          </article>
        </Container>
      </main>
    </div>
  );
};

export default BlogDetail;
