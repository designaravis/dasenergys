import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';
import emailjs from '@emailjs/browser';

const ContactPage = ({ onBack, onNavigate }) => {
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

  // Social Icons (copied from App.jsx)
  const LinkedInIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>);
  const YoutubeIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>);
  const InstagramIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>);
  const FacebookIcon = () => (<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar searchTerm="" setSearchTerm={() => {}} onNavigate={onNavigate} />
      
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <Container>
          <div className="mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest hover:gap-4 transition-all mb-4 text-[10px]"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-2 leading-none">
              Let's <span className="text-brand-primary">Collaborate</span>
            </h1>
            <p className="text-base text-slate-500 font-bold max-w-2xl">
              Connect with our technical team for custom solutions and equipment quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Form Section */}
            <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-[32px] shadow-2xl border border-slate-50 relative overflow-hidden">
               {/* Technical pattern background */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-soft/10 rounded-full blur-[80px] -z-10" />
              
              <div className="inline-flex items-center gap-3 px-4 py-1.5 border-2 border-brand-primary rounded-xl mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-primary">Direct Inquiry</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-black mb-6 text-slate-900 uppercase tracking-tighter leading-none">
                Request <span className="text-brand-primary">Technical</span> Quote
              </h2>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Full Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      type="text" placeholder="Your Name" className="w-full px-5 py-3 bg-slate-50/50 border-2 border-transparent rounded-xl focus:border-brand-primary/20 focus:bg-white outline-none text-sm text-slate-900 transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="tel" placeholder="+91 00000 00000" className="w-full px-5 py-3 bg-slate-50/50 border-2 border-transparent rounded-xl focus:border-brand-primary/20 focus:bg-white outline-none text-sm text-slate-900 transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Email Address</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email" placeholder="research@university.edu" className="w-full px-5 py-3 bg-slate-50/50 border-2 border-transparent rounded-xl focus:border-brand-primary/20 focus:bg-white outline-none text-sm text-slate-900 transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Organization</label>
                    <input
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      type="text" placeholder="IIT Madras / R&D Lab" className="w-full px-5 py-3 bg-slate-50/50 border-2 border-transparent rounded-xl focus:border-brand-primary/20 focus:bg-white outline-none text-sm text-slate-900 transition-all font-bold placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 ml-1">Message / Requirements</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="2" placeholder="How can we help you?" className="w-full px-5 py-3 bg-slate-50/50 border-2 border-transparent rounded-xl focus:border-brand-primary/20 focus:bg-white outline-none text-sm text-slate-900 transition-all font-bold placeholder:text-slate-300 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-brand-primary text-white rounded-xl text-xs font-black uppercase tracking-[0.15em] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/40 flex items-center justify-center gap-3 disabled:bg-slate-400"
                >
                  {status === "sending" ? "Processing..." : status === "success" ? "Inquiry Sent!" : <>Send Inquiry <Send className="w-4 h-4" /></>}
                </button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-4 bg-brand-soft/50 rounded-[24px] border border-brand-primary/20 mt-2"
                    >
                      <p className="text-xs font-black text-brand-primary uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Submission Successful
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-6 rounded-[24px] shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-brand-soft rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Corporate HQ</h4>
                    <p className="text-xs font-bold text-slate-900 leading-tight">No: 15, Balaji Nagar, North Malayambakkam, Chennai.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-brand-soft rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email Us</h4>
                    <p className="text-xs font-bold text-slate-900">info.dasenergys@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-brand-soft rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Support Hotline</h4>
                    <p className="text-xs font-bold text-slate-900">+91 88072 43902</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-3 rounded-[24px] shadow-xl border border-slate-100 overflow-hidden h-[240px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.010130619079!2d80.0833267!3d13.0350267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b00697c98f5%3A0x651447dc108f4023!2sDas%20Instruments%20and%20Solutions!5e0!3m2!1sen!2sin!4v1715252814838!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0, borderRadius: '16px' }} allowFullScreen="" loading="lazy"
                ></iframe>
              </div>

              {/* Social */}
              <div className="flex gap-3 justify-center py-2">
                {[
                  { icon: <FacebookIcon />, link: "https://facebook.com/dasinstruments", color: "text-[#1877F2]" },
                  { icon: <InstagramIcon />, link: "https://instagram.com/dasinstruments", color: "text-[#E4405F]" },
                  { icon: <LinkedInIcon />, link: "https://linkedin.com/company/das-instruments", color: "text-[#0077B5]" },
                  { icon: <YoutubeIcon />, link: "https://youtube.com/@dasinstruments", color: "text-[#FF0000]" }
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center ${social.color} hover:shadow-xl transition-all duration-300 hover:scale-110 scale-90`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default ContactPage;
