import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import Container from '../components/Container';
import Navbar from '../components/Navbar';

// Reuse the exact logic and styling from the main Contact component
const ContactPage = ({ onBack }) => {
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
      const response = await fetch("https://splitforms.com/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "1c27f3b3ec33466eaae3264f8cf077f9",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          message: formData.message,
          subject: `New Technical Quote Request from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", organization: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
      }
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
    <div className="min-h-screen bg-white">
      {/* Hero Section for Contact Page */}
      <section className="pt-32 pb-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary/10 blur-[120px] -z-10" />
        <Container>
          <div className="max-w-4xl">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-brand-light font-black uppercase tracking-widest mb-12 hover:gap-4 transition-all"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </button>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight uppercase tracking-tighter mb-6">
              Let's <span className="text-brand-primary">Connect</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl">
              Get expert technical guidance and precision quotes for your next energy research breakthrough.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[48px] shadow-4xl border border-slate-100">
              <span className="section-tag mb-6">Technical Inquiry</span>
              <h2 className="text-3xl md:text-5xl font-black mb-10 text-slate-900 leading-tight uppercase tracking-tighter">
                Request a <span className="text-brand-primary">Technical</span> Quote
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <input type="text" name="_gotcha" style={{ display: "none" }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      type="text" placeholder="Scientific Lead / Engineer Name" 
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-brand-primary focus:bg-white outline-none text-base text-slate-600 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      type="tel" placeholder="+91 00000 00000" 
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-brand-primary focus:bg-white outline-none text-base text-slate-600 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email" placeholder="research@university.edu" 
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-brand-primary focus:bg-white outline-none text-base text-slate-600 transition-all font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Organization</label>
                    <input
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      required
                      type="text" placeholder="IIT / R&D Institute / Industry" 
                      className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-brand-primary focus:bg-white outline-none text-base text-slate-600 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Technical Requirements</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4" placeholder="Detail your project requirements here..." 
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-brand-primary focus:bg-white outline-none text-base text-slate-600 transition-all font-bold"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-5 bg-brand-primary text-white rounded-2xl text-base font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-4 disabled:bg-slate-400 active:scale-[0.98]"
                >
                  {status === "sending" ? "Processing..." : status === "success" ? "Inquiry Sent!" : <>Send Inquiry <Send className="w-5 h-5" /></>}
                </button>

                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-6 bg-brand-soft rounded-3xl border-2 border-brand-primary/20 mt-6"
                    >
                      <p className="text-base font-black text-brand-primary uppercase tracking-widest flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-6 h-6" /> Inquiry Received Successfully!
                      </p>
                      <p className="text-sm text-brand-primary/70 mt-2 font-bold">Our technical team will contact you within 24 hours.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 p-8 rounded-[40px] border-2 border-transparent hover:border-brand-primary transition-all group shadow-xl">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-lg mb-6">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Corporate Headquarters</h3>
                <p className="text-lg font-bold text-slate-900 leading-relaxed">No: 15, Balaji Nagar, North Malayambakkam, Chennai - 600 123.</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-[40px] border-2 border-transparent hover:border-brand-primary transition-all group shadow-xl">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-lg mb-6">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Technical Sales</h3>
                <p className="text-lg font-bold text-slate-900">info.dasenergys@gmail.com</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-[40px] border-2 border-transparent hover:border-brand-primary transition-all group shadow-xl">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-lg mb-6">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Global Support</h3>
                <p className="text-lg font-bold text-slate-900">+91 88072 43902</p>
              </div>

              {/* Map Integration */}
              <div className="rounded-[40px] overflow-hidden h-[300px] shadow-2xl border-4 border-slate-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.010130619079!2d80.0833267!3d13.0350267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b00697c98f5%3A0x651447dc108f4023!2sDas%20Instruments%20and%20Solutions!5e0!3m2!1sen!2sin!4v1715252814838!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
