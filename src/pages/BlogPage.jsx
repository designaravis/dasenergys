import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Search, BookOpen } from 'lucide-react';
import Navbar from '../components/Navbar';
import Container from '../components/Container';

const BlogPage = ({ onSelectPost, onBack, searchTerm, setSearchTerm, onNavigate }) => {
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
          setPosts(formattedPosts);
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
    <div className="min-h-screen bg-slate-50 relative z-[500] selection:bg-brand-primary selection:text-white">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onNavigate={onNavigate} />
      
      <main className="pt-32 pb-32">
        <Container>
          <div className="mb-20">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest mb-10 hover:gap-4 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </button>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brand-soft rounded-full mb-6">
                  <BookOpen className="w-4 h-4 text-brand-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">Knowledge Hub</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase mb-8">
                  Technical <br /><span className="text-brand-primary">Insights</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl leading-relaxed">
                  Deep dives into the latest energy fabrication technologies, research breakthroughs, and laboratory best practices.
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-[40px] h-[500px] animate-pulse border-2 border-slate-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.length > 0 ? posts.map((p) => (
                <motion.article
                  key={p.id}
                  onClick={() => onSelectPost(p)}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-[40px] overflow-hidden border-2 border-transparent hover:border-brand-primary transition-all shadow-2xl shadow-slate-200/40 flex flex-col h-full cursor-pointer"
                >
                  <div className="h-64 overflow-hidden relative bg-slate-50 flex items-center justify-center">
                    <img src={p.image} alt={p.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{p.date}</div>
                    <h4 className="text-2xl font-black mb-6 text-slate-900 tracking-tighter leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    <p className="text-slate-500 font-bold text-base leading-relaxed mb-8 flex-grow line-clamp-3">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-brand-primary group-hover:gap-6 transition-all mt-auto pt-6 border-t border-slate-50">
                      Explore Technical Paper <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.article>
              )) : (
                <div className="col-span-full py-40 text-center bg-white rounded-[60px] border-4 border-dashed border-slate-100">
                  <div className="flex justify-center mb-8">
                    <Search className="w-20 h-20 text-slate-200" />
                  </div>
                  <p className="text-3xl font-black text-slate-300 uppercase tracking-[0.2em]">Archive is empty.</p>
                </div>
              )}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default BlogPage;
