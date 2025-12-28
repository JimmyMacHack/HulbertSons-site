import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Star, Shield, Zap, ChevronDown, Phone } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import ContactForm from './ContactForm';

interface HoustonPageProps {
  navigateTo: (page: string, sectionId?: string | null) => void;
}

const HoustonPage: React.FC<HoustonPageProps> = ({ navigateTo }) => {
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPhoneDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white pt-24 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?auto=format&fit=crop&q=80&w=2000" 
            alt="Houston Skyline" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <RevealOnScroll className="flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 bg-brandGold/20 border border-brandGold/30 rounded-full px-6 py-2 mb-8 backdrop-blur-md">
              <MapPin className="w-5 h-5 text-brandGold" />
              <span className="text-brandGold text-sm font-black tracking-widest uppercase">Now Serving: Greater Houston</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              HOUSTON <span className="text-brandGold italic">TEXAS</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
              Bringing our New Orleans legacy of <span className="text-white font-black italic">integrity</span> and <span className="text-white font-black italic">craftsmanship</span> to the Lone Star State.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => {
                  const el = document.getElementById('houston-estimate');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brandGold hover:bg-white text-slate-900 font-black py-5 px-12 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 text-lg uppercase tracking-wider"
              >
                Book a Houston Estimate
              </button>
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold py-5 px-10 rounded-2xl border border-white/20 backdrop-blur-sm transition-all text-lg uppercase tracking-wider"
              >
                <ArrowLeft className="w-5 h-5 mr-3" /> Back to Main
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Houston Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Licensed & Texas Insured", desc: "Fully compliant with local Texas regulations and safety standards for your peace of mind." },
              { icon: Zap, title: "Rapid Response", desc: "Prompt scheduling for all Greater Houston areas, from The Woodlands to Sugar Land." },
              { icon: Star, title: "Elite Craftsmanship", desc: "The same high-quality family standards that built our reputation over generations." }
            ].map((feature, i) => (
              <RevealOnScroll key={i} delay={i * 100} className="bg-white p-10 rounded-3xl shadow-xl border-t-4 border-brandGold text-center">
                <div className="bg-brandGold/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-brandGold" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase italic">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Cover */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex items-center gap-20">
            <div className="lg:w-1/2 mb-16 lg:mb-0">
              <RevealOnScroll>
                <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-tight italic">
                  Serving the <span className="text-brandGold">Greater Houston</span> Area.
                </h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  We are proud to extend our family services to the vibrant communities of Houston. Whether you have a modern build or a historic Texas home, we have the tools to protect it.
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {['Sugar Land', 'The Woodlands', 'Katy', 'Pearland', 'Cypress', 'Kingwood', 'Memorial', 'Heights'].map((area, i) => (
                    <div key={i} className="flex items-center text-slate-800 font-bold">
                      <div className="w-2 h-2 bg-brandGold rounded-full mr-3"></div>
                      {area}
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
            <div className="lg:w-1/2">
              <RevealOnScroll delay={200} className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-square">
                 <img 
                   src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200" 
                   alt="Houston Luxury Home" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border-l-4 border-brandGold text-white shadow-2xl max-w-xs">
                    <p className="text-brandGold font-black uppercase text-xs tracking-widest mb-1">Local Excellence</p>
                    <p className="font-bold">Hulbert & Sons is committed to maintaining Houston's finest residential properties.</p>
                 </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Houston Contact Section */}
      <section id="houston-estimate" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll>
              <h2 className="text-5xl font-black text-white mb-8 tracking-tighter leading-tight italic">
                Houston <span className="text-brandGold uppercase">Project?</span><br />Let's Get Started.
              </h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-md">
                We're currently building our local Houston crew but are already accepting residential project inquiries and site visits.
              </p>
              
              <div className="space-y-6 relative" ref={dropdownRef}>
                <div 
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                  className="bg-slate-800/50 p-6 rounded-3xl border border-brandGold/20 flex items-center group cursor-pointer hover:bg-slate-800 transition-all w-fit"
                >
                  <div className="w-12 h-12 bg-brandGold rounded-xl flex items-center justify-center mr-6 shadow-xl shadow-brandGold/10">
                    <Phone className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <p className="text-xs text-brandGold font-black uppercase tracking-widest mb-1 flex items-center">
                      Direct Line Selector <ChevronDown className={`w-3 h-3 ml-2 transition-transform duration-300 ${isPhoneDropdownOpen ? 'rotate-180' : ''}`} />
                    </p>
                    <p className="text-2xl font-black text-white flex items-center">
                      Call Support <ChevronDown className="w-5 h-5 ml-4 text-brandGold group-hover:translate-y-1 transition-transform" />
                    </p>
                  </div>
                </div>

                {isPhoneDropdownOpen && (
                  <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-brandGold/20 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 bg-slate-900 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brandGold">Regional Branch Selection</p>
                    </div>
                    <div className="p-2">
                      <a href="tel:2815777533" className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Houston, TX (Direct)</p>
                          <p className="font-bold text-slate-900">281-577-7533</p>
                        </div>
                      </a>
                      <div className="h-px bg-slate-100 mx-4"></div>
                      <a href="tel:5044527895" className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Orleans, LA (HQ)</p>
                          <p className="font-bold text-slate-900">(504) 452-7895</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
                
                <p className="text-slate-500 text-sm font-medium italic">* Our main line handles all initial scheduling to ensure quality control.</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="bg-white p-2 rounded-3xl shadow-2xl">
                <ContactForm />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HoustonPage;