import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Star, Clock, HardHat, ChevronLeft, ChevronRight, ArrowRight, Video, Phone, Mail, PaintBucket, Hammer, MapPin, ChevronDown } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import ContactForm from './ContactForm';

const AboutCarousel = () => {
  const slides = [
    "https://i.ibb.co/SwPprDpZ/IMG-2356.jpg",
    "https://i.ibb.co/hxKQjFR4/IMG-2346.jpg",
    "https://i.ibb.co/fz7FMNMx/IMG-2349.jpg"
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-lg shadow-2xl overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px] group border-4 border-white">
      <div 
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`About Us Slide ${index + 1}`} 
            className="w-full h-full object-cover flex-shrink-0" 
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10 transform hover:scale-110">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 z-10 transform hover:scale-110">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${current === idx ? 'bg-brandGold w-8' : 'bg-white/50 w-2 hover:bg-white'}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-xs border-l-4 border-brandGold hidden md:block z-10">
        <p className="font-bold text-slate-900 text-lg mb-1">"This is what we do!"</p>
        <p className="text-slate-600 text-sm">Quality work. Honest pricing. Family values.</p>
      </div>
    </div>
  );
};

interface HomePageProps {
  navigateTo: (page: string, sectionId?: string | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
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
    <>
      {/* Hero Section */}
      <div id="home" className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://i.ibb.co/6c19T3b5/A9-CF604-D-8812-4546-9879-D36-B255-EBF20.jpg" 
            alt="Construction Work" 
            className="w-full h-full object-cover scale-105"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="md:w-3/4 lg:w-2/3">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center space-x-2 bg-brandGold/20 border border-brandGold/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <Star className="w-4 h-4 text-brandGold fill-current" />
                <span className="text-brandGold text-xs md:text-sm font-black tracking-widest uppercase">Family Owned & Operated</span>
              </div>
              <div className="inline-flex items-center space-x-2 bg-brandGold/20 border border-brandGold/30 rounded-full px-4 py-1.5 backdrop-blur-sm cursor-pointer hover:bg-brandGold/30 transition-all" onClick={() => navigateTo('houston')}>
                <MapPin className="w-4 h-4 text-brandGold" />
                <span className="text-brandGold text-xs md:text-sm font-black tracking-widest uppercase animate-pulse italic">Houston Branch Now Open</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] mb-8">
              Trusted Home Repairs.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandGold to-yellow-200">
                Rooted in Family.
              </span><br />
              Built on Integrity.
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-xl leading-relaxed font-medium">
              From quick fixes to major renovations, Hulbert & Sons delivers quality craftsmanship you can count on. We treat your home like our own.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigateTo('home', 'contact')} className="bg-brandGold hover:bg-white text-slate-900 font-black py-5 px-10 rounded-xl shadow-lg hover:shadow-brandGold/30 transition-all transform hover:-translate-y-1 hover:scale-105 text-center text-lg uppercase tracking-wider">
                Get a Free Estimate
              </button>
              <button onClick={() => navigateTo('services')} className="bg-white/10 hover:bg-white/20 text-white font-black py-5 px-10 rounded-xl backdrop-blur-sm border border-white/20 transition-all transform hover:-translate-y-1 text-center text-lg uppercase tracking-wider">
                View Our Services
              </button>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="relative bg-slate-800/80 backdrop-blur-md border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
              {[
                { icon: CheckCircle, title: "Licensed", subtitle: "& Insured" },
                { icon: Star, title: "5-Star Rated", subtitle: "Local Service" },
                { icon: Clock, title: "Always On Time", subtitle: "Reliable Scheduling" },
                { icon: HardHat, title: "Expert Team", subtitle: "Skilled Craftsmen" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center md:justify-start group hover:transform hover:translate-x-1 transition-transform duration-300">
                  <div className="mr-4 bg-brandGold/10 p-2 rounded-lg group-hover:bg-brandGold/20 transition-colors">
                    <item.icon className="w-6 h-6 text-brandGold" />
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-brandGold transition-colors">{item.title}</p>
                    <p className="text-xs text-slate-400">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-tr from-slate-100 via-yellow-100/20 to-blue-50/40 relative overflow-hidden border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="mb-16 text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-brandGold uppercase bg-brandGold/10 rounded-full border border-brandGold/20">
                About Hulbert & Sons
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                A Family Legacy Built on <span className="text-brandGold relative inline-block italic">
                  Integrity
                  <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-brandGold rounded-full opacity-50"></span>
                </span>
            </h2>
             <p className="text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
                 Hulbert & Sons is a family-owned home repair and renovation service providing reliable, effective, and high-quality work. We handle everything from small fixes to full home improvements. 
             </p>
          </RevealOnScroll>

          <div className="lg:grid lg:grid-cols-3 lg:gap-16 items-start">
            <RevealOnScroll delay={200} className="relative mb-12 lg:mb-0 lg:col-span-2">
              <AboutCarousel />
            </RevealOnScroll>
            
            <RevealOnScroll delay={400} className="lg:col-span-1 h-full">
                <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-brandGold/20 h-full flex flex-col justify-center shadow-2xl hover:shadow-brandGold/10 transition-all duration-500 group">
                   <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                     <Star className="w-6 h-6 text-brandGold mr-3 fill-current" />
                     Meet the Owner
                   </h3>
                   <div className="mb-4">
                     <span className="font-black text-slate-900 block text-2xl tracking-tight">James Hulbert</span>
                   </div>
                   <p className="text-slate-600 leading-relaxed italic mb-8 text-lg border-l-4 border-brandGold pl-4 py-2">
                     "I started this business with a simple belief: that homeowners deserve a handyman they can actually trust. I personally oversee our projects to ensure that the work we do on your home is the same quality I'd expect in my own."
                   </p>
                   
                   <button onClick={() => navigateTo('services')} className="bg-slate-900 text-white py-4 px-6 rounded-xl font-black uppercase tracking-widest hover:bg-brandGold hover:text-slate-900 flex items-center justify-center group mt-auto transition-all shadow-lg hover:shadow-brandGold/20">
                    Discover Services
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Services Summary Section */}
      <section id="services-summary" className="py-24 bg-gradient-to-br from-white via-yellow-50/20 to-slate-100 relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 inline-block relative italic">
              Our Expertise
              <span className="absolute bottom-1 left-0 w-full h-4 bg-brandGold/20 -z-10 rounded-full"></span>
            </h2>
            <p className="text-xl text-slate-600 mt-2">
              Professional solutions for every corner of your property, delivered with precision.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Interior Card */}
            <RevealOnScroll delay={100} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 group hover:-translate-y-2">
              <div className="h-72 overflow-hidden bg-slate-200 relative">
                 <img 
                   src="https://i.ibb.co/cSYsww6p/pexels-chadpopulisphotography-30725652.jpg" 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                   alt="Interior"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                 <div className="absolute top-6 left-6 bg-brandGold text-slate-900 p-4 rounded-xl shadow-2xl transform group-hover:rotate-6 transition-transform">
                    <PaintBucket className="w-8 h-8" />
                 </div>
                 <div className="absolute bottom-6 left-6 text-white font-bold text-2xl uppercase tracking-tighter italic">Interior Mastery</div>
              </div>
              <div className="p-8">
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  Transform your living spaces with expert craftsmanship. From kitchen and bathroom remodels to custom carpentry, we handle all aspects of interior renovation.
                </p>
                <button onClick={() => navigateTo('services')} className="w-full bg-slate-50 text-slate-900 py-3 rounded-lg font-black uppercase tracking-wider border border-slate-200 hover:bg-brandGold hover:text-slate-900 hover:border-brandGold transition-all flex items-center justify-center group">
                  View Interior Gallery <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </RevealOnScroll>

            {/* Exterior Card */}
            <RevealOnScroll delay={300} className="bg-gradient-to-br from-brandGold to-[#d4a006] rounded-2xl shadow-xl hover:shadow-brandGold/30 transition-all duration-500 overflow-hidden border border-[#d4a006] group hover:-translate-y-2">
              <div className="h-72 overflow-hidden bg-[#8a6a04] relative">
                 <img 
                   src="https://i.ibb.co/HjdWF6B/pexels-pixabay-209296.jpg" 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80" 
                   alt="Exterior"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                 <div className="absolute top-6 left-6 bg-slate-900 text-brandGold p-4 rounded-xl shadow-2xl transform group-hover:-rotate-6 transition-transform">
                    <Hammer className="w-8 h-8" />
                 </div>
                 <div className="absolute bottom-6 left-6 text-white font-black text-2xl tracking-tighter uppercase italic">Exterior Protection</div>
              </div>
              <div className="p-8">
                <p className="text-white mb-8 text-lg leading-relaxed font-black drop-shadow-lg">
                  Protect and enhance your home's curb appeal. We specialize in roofing repairs, siding, decks, and gutter maintenance to ensure your home stands strong.
                </p>
                <button onClick={() => navigateTo('services')} className="w-full bg-slate-950 text-brandGold py-4 rounded-xl font-black uppercase tracking-widest border border-slate-900 hover:bg-white hover:text-brandGold transition-all flex items-center justify-center group shadow-xl">
                  View Exterior Gallery <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight italic">
                  Let's Get Your Project <span className="text-brandGold uppercase">Moving</span>.
                </h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                  Tell us about your home's needs and we'll provide a clear plan, honest pricing, and the quality execution you deserve.
                </p>
                
                <div className="space-y-8 relative" ref={dropdownRef}>
                  <div 
                    onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                    className="flex items-center text-white group cursor-pointer hover:bg-slate-800/50 p-4 rounded-3xl border border-white/5 transition-all w-fit"
                  >
                    <div className="w-14 h-14 bg-brandGold rounded-2xl flex items-center justify-center mr-6 shadow-2xl shadow-brandGold/20 group-hover:scale-110 transition-transform">
                      <Phone className="w-7 h-7 text-slate-900" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs text-brandGold font-black uppercase tracking-widest mb-1 flex items-center">
                        Contact Support <ChevronDown className={`w-3 h-3 ml-2 transition-transform duration-300 ${isPhoneDropdownOpen ? 'rotate-180' : ''}`} />
                      </p>
                      <p className="text-3xl font-black tracking-tight flex items-center">
                        Choose Branch <ChevronDown className="w-6 h-6 ml-4 text-brandGold group-hover:translate-y-1 transition-transform" />
                      </p>
                    </div>
                  </div>

                  {isPhoneDropdownOpen && (
                    <div className="absolute top-full left-0 mt-4 w-72 bg-white rounded-2xl shadow-2xl border border-brandGold/20 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4">
                      <div className="p-4 bg-slate-900 text-white border-b border-white/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brandGold">Direct Dial Selection</p>
                      </div>
                      <div className="p-2">
                        <a href="tel:5044527895" className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-all group">
                          <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                            <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Orleans, LA</p>
                            <p className="font-bold text-slate-900">(504) 452-7895</p>
                          </div>
                        </a>
                        <div className="h-px bg-slate-100 mx-4"></div>
                        <a href="tel:2815777533" className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-all group">
                          <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                            <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Houston, TX</p>
                            <p className="font-bold text-slate-900">(281) 577-7533</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-brandGold/20 backdrop-blur-sm shadow-2xl">
                  <div className="flex items-start">
                    <div className="bg-brandGold/10 p-4 rounded-2xl mr-6">
                      <Video className="w-7 h-7 text-brandGold" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">Free Virtual Estimate</h3>
                      <p className="text-slate-400 mb-6 text-lg leading-relaxed">
                        Too busy for an in-person visit? Schedule a video call <span className="font-bold text-brandGold">TODAY</span> for a quick visual quote.
                      </p>
                      <a 
                        href="https://calendly.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-brandGold text-slate-900 font-black py-3.5 px-8 rounded-xl text-base hover:bg-white transition-all shadow-xl"
                      >
                        Book Calendly <ArrowRight className="w-5 h-5 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={200} className="relative">
              <ContactForm />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;