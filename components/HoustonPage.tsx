import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MapPin, Star, Shield, Zap, ChevronDown, Phone, Home, Droplets, ShieldAlert, Quote } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import RevealOnScroll from './RevealOnScroll';
import ContactForm from './ContactForm';

const createCustomMarker = (isMain = false) => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center">
      <div class="${isMain ? 'bg-slate-900 border-brandGold animate-pulse' : 'bg-brandGold border-white'} p-2 rounded-full border-2 shadow-2xl shadow-brandGold/30 text-${isMain ? 'brandGold' : 'slate-900'}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
    </div>`,
    className: 'custom-marker-div',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const serviceAreas = [
  { name: 'Houston Central', coords: [29.7604, -95.3698] as [number, number], info: 'Houston Branch Base', isMain: true },
  { name: 'Sugar Land', coords: [29.5984, -95.6226] as [number, number], info: 'Residential Service Region' },
  { name: 'The Woodlands', coords: [30.1658, -95.4613] as [number, number], info: 'Residential Service Region' },
  { name: 'Katy', coords: [29.7858, -95.8245] as [number, number], info: 'Residential Service Region' },
  { name: 'Pearland', coords: [29.5636, -95.2860] as [number, number], info: 'Residential Service Region' },
  { name: 'Cypress', coords: [29.9717, -95.6938] as [number, number], info: 'Residential Service Region' },
  { name: 'Kingwood', coords: [30.0499, -95.1835] as [number, number], info: 'Residential Service Region' },
  { name: 'Memorial', coords: [29.7700, -95.5200] as [number, number], info: 'Residential Service Region' },
  { name: 'The Heights', coords: [29.7900, -95.4000] as [number, number], info: 'Residential Service Region' },
];

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
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <div className="relative bg-slate-900 text-white pt-24 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Houston Luxury Home" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/60 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <RevealOnScroll className="flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 bg-brandGold/20 border border-brandGold/30 rounded-full px-6 py-2 mb-8 backdrop-blur-md">
              <MapPin className="w-5 h-5 text-brandGold" />
              <span className="text-brandGold text-sm font-black tracking-widest uppercase">Now Serving: Greater Houston</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              HOUSTON <span className="text-brandGold italic uppercase">Texas</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed mb-12">
              Bringing our New Orleans legacy of <span className="text-white font-black italic underline decoration-brandGold">integrity</span> and <span className="text-white font-black italic underline decoration-brandGold">craftsmanship</span> to the Lone Star State.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => {
                  const el = document.getElementById('houston-estimate');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brandGold hover:bg-white text-slate-900 font-black py-6 px-12 rounded-2xl shadow-2xl transition-all transform hover:-translate-y-1 text-lg uppercase tracking-widest border-b-4 border-slate-900/20"
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

      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Licensed & Texas Insured", desc: "Fully compliant with local Texas regulations and safety standards for your peace of mind." },
              { icon: Zap, title: "Rapid Response", desc: "Prompt scheduling for all Greater Houston areas, from The Woodlands to Sugar Land." },
              { icon: Star, title: "Elite Craftsmanship", desc: "The same high-quality family standards that built our reputation over generations." }
            ].map((feature, i) => (
              <RevealOnScroll key={i} delay={i * 100} className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border-t-4 border-brandGold text-center group hover:shadow-2xl transition-all border-x border-b border-transparent dark:border-white/5">
                <div className="bg-brandGold/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brandGold transition-colors">
                  <feature.icon className="w-8 h-8 text-brandGold group-hover:text-slate-900 transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase italic">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-y border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex items-center gap-20">
            <div className="lg:w-1/2 mb-16 lg:mb-0">
              <RevealOnScroll>
                <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight italic">
                  Serving the <span className="text-brandGold">Greater Houston</span> Area.
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                  We are proud to extend our family services to the vibrant communities of Houston. Whether you have a modern build or a historic Texas home, we have the tools to protect it.
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {serviceAreas.map((area, i) => (
                    <div key={i} className="flex items-center text-slate-800 dark:text-slate-200 font-bold group cursor-default">
                      <div className="w-2 h-2 bg-brandGold rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                      {area.name}
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
            
            <div className="lg:w-1/2">
              <RevealOnScroll delay={200} className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square border-8 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                 <div className="w-full h-full">
                   <MapContainer 
                     center={[29.7604, -95.3698]} 
                     zoom={9} 
                     scrollWheelZoom={false}
                     className="w-full h-full"
                   >
                     <TileLayer
                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                       url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                     />
                     {serviceAreas.map((area, idx) => (
                       <Marker 
                        key={idx} 
                        position={area.coords} 
                        icon={createCustomMarker(area.isMain)}
                       >
                         <Popup className="rounded-xl overflow-hidden shadow-2xl">
                           <div className="p-2">
                             <h4 className="font-black text-slate-900 uppercase italic text-sm">{area.name}</h4>
                             <p className="text-xs text-slate-500 mt-1">{area.info}</p>
                             <button 
                               onClick={() => {
                                 const el = document.getElementById('houston-estimate');
                                 el?.scrollIntoView({ behavior: 'smooth' });
                               }}
                               className="mt-3 text-[10px] font-black text-brandGold uppercase tracking-widest hover:underline"
                             >
                               Get Local Estimate
                             </button>
                           </div>
                         </Popup>
                       </Marker>
                     ))}
                   </MapContainer>
                 </div>
                 
                 <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 dark:bg-black/95 backdrop-blur-md p-6 rounded-2xl border-l-4 border-brandGold text-white shadow-2xl z-[500] pointer-events-none">
                    <p className="text-brandGold font-black uppercase text-[10px] tracking-widest mb-1">Live Service Map</p>
                    <p className="font-bold text-sm">Hulbert & Sons covers all major zip codes across Greater Houston.</p>
                 </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-6">
              Texas Sized <span className="text-brandGold">Trust</span>
            </h2>
            <p className="text-lg text-slate-400">See what your neighbors in Houston are saying about the Hulbert & Sons experience.</p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Robert M.", location: "Katy, TX", text: "Hulbert & Sons brought that New Orleans charm and work ethic to my master bath remodel. Fast, clean, and honest." },
              { name: "Sarah L.", location: "The Woodlands", text: "Finally, a contractor that shows up when they say they will. They fixed our fence after the storm and it looks better than new." },
              { name: "James W.", location: "Sugar Land", text: "The virtual estimate was a game changer for my busy schedule. Quality work done by a real professional family team." }
            ].map((testimonial, i) => (
              <RevealOnScroll key={i} delay={i * 150} className="bg-slate-800 p-8 rounded-[2.5rem] border border-white/5 relative group hover:bg-slate-850 transition-all">
                <Quote className="absolute top-6 right-8 w-10 h-10 text-brandGold/20 group-hover:text-brandGold/40 transition-colors" />
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brandGold fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 italic mb-8 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brandGold/20 flex items-center justify-center font-black text-brandGold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-white leading-none">{testimonial.name}</p>
                    <p className="text-xs text-brandGold uppercase tracking-widest mt-1">{testimonial.location}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-black tracking-widest text-slate-900 dark:text-brandGold uppercase bg-white dark:bg-brandGold/10 rounded-full border border-slate-200 dark:border-brandGold/20">
                Texas Specific Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase italic">
              Specialized <span className="text-brandGold">Houston</span> Handyman Services
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              We specialize in high-quality maintenance and repairs tailored to Houston's unique climate and home styles.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Home, 
                title: "Hardie Plank Maintenance", 
                desc: "Expert cleaning, professional caulking, and minor repairs for fiber-cement siding. We keep your exterior watertight and looking sharp.",
                highlight: "Moisture Protection"
              },
              { 
                icon: ShieldAlert, 
                title: "Hurricane Readiness", 
                desc: "Pre-season window board-ups, gutter anchoring, and securing patio furniture or loose structures to minimize storm damage.",
                highlight: "Safety First"
              },
              { 
                icon: Droplets, 
                title: "Gutter & Drainage Clearing", 
                desc: "Full gutter cleaning, downspout flushing, and ground-level runoff checks to ensure Houston's heavy rains don't impact your foundation.",
                highlight: "Water Management"
              }
            ].map((service, i) => (
              <RevealOnScroll key={i} delay={i * 100} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/5 flex flex-col h-full group hover:border-brandGold transition-all">
                <div className="bg-slate-900 dark:bg-black w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brandGold transition-colors">
                  <service.icon className="w-7 h-7 text-brandGold group-hover:text-slate-900" />
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brandGold bg-brandGold/10 px-3 py-1 rounded-full mb-3 inline-block">
                    {service.highlight}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">{service.title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6 flex-grow">{service.desc}</p>
                <div className="pt-6 border-t border-slate-50 dark:border-slate-700">
                  <button 
                    onClick={() => {
                      const el = document.getElementById('houston-estimate');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center group/btn"
                  >
                    Request Quote <Zap className="w-3 h-3 ml-2 text-brandGold group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="houston-estimate" className="py-24 bg-slate-900 dark:bg-black relative overflow-hidden transition-colors duration-500">
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
                  <div className="absolute top-full left-0 mt-4 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-brandGold/20 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 bg-slate-900 dark:bg-black text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brandGold">Regional Branch Selection</p>
                    </div>
                    <div className="p-2">
                      <a href="tel:2815777533" className="flex items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Houston, TX (Direct)</p>
                          <p className="font-bold text-slate-900 dark:text-white">281-577-7533</p>
                        </div>
                      </a>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
                      <a href="tel:5044527895" className="flex items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Orleans, LA (HQ)</p>
                          <p className="font-bold text-slate-900 dark:text-white">(504) 452-7895</p>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
                
                <p className="text-slate-500 text-sm font-medium italic">* Our main line handles all initial scheduling to ensure quality control.</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="bg-white dark:bg-transparent p-2 rounded-3xl shadow-2xl transition-all duration-500">
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