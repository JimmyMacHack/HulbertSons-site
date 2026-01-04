import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Star, Clock, HardHat, ChevronLeft, ChevronRight, ArrowRight, Video, Phone, Mail, PaintBucket, Hammer, MapPin, ChevronDown, Repeat, Camera, Zap, Quote } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import RevealOnScroll from './RevealOnScroll';
import ContactForm from './ContactForm';

// Helper to fix icon issues and create custom brand markers
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

const nolaServiceAreas = [
  { name: 'NOLA Central', coords: [29.9511, -90.0715] as [number, number], info: 'Headquarters & Primary Service Area', isMain: true },
  { name: 'Metairie', coords: [29.9841, -90.1529] as [number, number], info: 'Residential Service Region' },
  { name: 'Kenner', coords: [30.0069, -90.2504] as [number, number], info: 'Residential Service Region' },
  { name: 'Slidell', coords: [30.2752, -89.7812] as [number, number], info: 'Northshore Service Region' },
  { name: 'Mandeville', coords: [30.3583, -90.0656] as [number, number], info: 'Northshore Service Region' },
  { name: 'Covington', coords: [30.4755, -90.1009] as [number, number], info: 'Northshore Service Region' },
  { name: 'Gretna', coords: [29.9146, -90.0531] as [number, number], info: 'Westbank Service Region' },
  { name: 'Harvey', coords: [29.8974, -90.0792] as [number, number], info: 'Westbank Service Region' },
  { name: 'Destrehan', coords: [29.9449, -90.3587] as [number, number], info: 'River Parishes Service Region' },
];

const homeTestimonials = [
  {
    name: "Catherine D.",
    location: "Uptown, New Orleans",
    text: "James and his team were a lifesaver. We had a persistent leak in our historic home that three other handymen couldn't fix. Hulbert & Sons diagnosed it immediately and repaired it with expert precision. Highly recommend!",
    branch: "NOLA"
  },
  {
    name: "Michael S.",
    location: "Sugar Land, TX",
    text: "Impressed by the professional approach. The virtual estimate was quick and accurate. They handled our fence replacement in Houston with top-tier quality. Great family business values.",
    branch: "Houston"
  },
  {
    name: "Linda R.",
    location: "Mandeville, LA",
    text: "Quality work and honest pricing as advertised. They remodeled our guest bathroom and the tile work is stunning. It's rare to find craftsmen who take this much pride in their work nowadays.",
    branch: "NOLA"
  }
];

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
    <div className="relative rounded-lg shadow-2xl overflow-hidden h-64 sm:h-80 md:h-96 lg:h-[500px] group border-4 border-white dark:border-slate-800">
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
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-brandGold text-slate-900 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 transform hover:scale-110">
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

      <div className="absolute bottom-8 left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-xs border-l-4 border-brandGold hidden md:block z-10">
        <p className="font-bold text-slate-900 dark:text-white text-lg mb-1">"This is what we do!"</p>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Quality work. Honest pricing. Family values.</p>
      </div>
    </div>
  );
};

const JobGallery = () => {
  const images = [
    "https://i.ibb.co/JRfK9x3f/Attachment-16.jpg",
    "https://i.ibb.co/pjCj67r2/IMG-2321.jpg",
    "https://i.ibb.co/whSsRf9s/IMG-3865.jpg",
    "https://i.ibb.co/hQCWYKg/Attachment-12.jpg",
    "https://i.ibb.co/G47VQLr4/Attachment-8.jpg",
    "https://i.ibb.co/jXbz7v7/Attachment-3.jpg"
  ];

  // Triple the images to ensure no gap occurs on ultra-wide screens
  const displayImages = [...images, ...images, ...images];

  return (
    <div className="w-full bg-white dark:bg-slate-950 py-16 border-b border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <RevealOnScroll className="flex items-center gap-4">
          <div className="p-3 bg-brandGold/10 rounded-2xl shadow-inner border border-brandGold/20">
            <Camera className="w-6 h-6 text-brandGold" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.4em] text-slate-900 dark:text-white italic flex items-center gap-3">
              Gallery <span className="text-brandGold">Completed Projects</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Real results for real families</p>
          </div>
        </RevealOnScroll>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Auto-Scrolling Gallery</span>
          </div>
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Gradients for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10"></div>

        <div className="flex animate-marquee whitespace-nowrap gap-8 py-4">
          {displayImages.map((src, idx) => (
            <div 
              key={idx} 
              className="relative w-[300px] md:w-[450px] h-[200px] md:h-[300px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group flex-shrink-0 transition-all duration-500 hover:shadow-brandGold/20 hover:-translate-y-2"
            >
              <img 
                src={src} 
                alt={`Hulbert & Sons Completed Job ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-brandGold text-slate-900 text-[10px] md:text-xs font-black uppercase px-6 py-2.5 rounded-xl shadow-2xl flex items-center gap-2">
                  <Star className="w-3 h-3 fill-current" />
                  Quality Assurance Verified
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HomePageProps {
  navigateTo: (page: string, sectionId?: string | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [isAfterFront, setIsAfterFront] = useState(true);
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 text-left">
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

            {/* Right Side: Interactive Before & After Collage */}
            <div 
              className="hidden lg:flex lg:w-1/2 justify-end relative h-[550px] cursor-pointer group/collage"
              onClick={() => setIsAfterFront(!isAfterFront)}
            >
              <div className="relative w-full max-w-lg h-full transition-all duration-700 select-none">
                {/* Before Image Card */}
                <div className={`absolute transition-all duration-1000 ease-in-out rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800
                  ${isAfterFront 
                    ? 'top-4 right-16 w-64 h-[350px] -rotate-6 grayscale-[0.6] z-0 opacity-70 scale-90 translate-x-[-15%]' 
                    : 'bottom-0 right-0 w-full h-[420px] rotate-0 grayscale-0 z-20 opacity-100 scale-100 shadow-slate-900/50'
                  }`}
                >
                  <img 
                    src="https://i.ibb.co/wVmjgZK/Attachment-15.jpg" 
                    alt="Property Before Transformation" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-[0.2em]">Before</div>
                </div>

                {/* After Image Card */}
                <div className={`absolute transition-all duration-1000 ease-in-out rounded-[2rem] overflow-hidden shadow-2xl border-4 border-brandGold
                  ${isAfterFront 
                    ? 'bottom-0 right-0 w-full h-[420px] rotate-0 z-20 opacity-100 scale-100 shadow-brandGold/40' 
                    : 'top-4 right-16 w-64 h-[350px] rotate-6 z-0 opacity-70 scale-90 translate-x-[-15%] grayscale-[0.2]'
                  }`}
                >
                  <img 
                    src="https://i.ibb.co/JRfK9x3f/Attachment-16.jpg" 
                    alt="Property After Transformation" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-brandGold text-slate-900 px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl">After</div>
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none"></div>
                </div>

                {/* Swap Control Indicator */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-brandGold/30 text-brandGold px-6 py-3 rounded-2xl flex items-center gap-3 z-30 shadow-2xl group-hover/collage:scale-110 transition-transform duration-300">
                  <Repeat className="w-5 h-5 animate-spin-slow" />
                  <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">Tap to Compare Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="relative bg-slate-800/80 dark:bg-black/50 backdrop-blur-md border-t border-slate-700 dark:border-slate-800 transition-colors duration-500">
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

      {/* INFINITE SCROLLING JOB GALLERY */}
      <JobGallery />

      {/* About Section - Enhanced with subtle premium gradient */}
      <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-white to-yellow-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative overflow-hidden border-y border-slate-200 dark:border-slate-800 shadow-inner transition-colors duration-500">
        {/* Decorative corner light glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandGold/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="mb-16 text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-brandGold uppercase bg-brandGold/10 rounded-full border border-brandGold/20">
                About Hulbert & Sons
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">
                A Family Legacy Built on <span className="text-brandGold relative inline-block italic">
                  Integrity
                  <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-brandGold rounded-full opacity-50"></span>
                </span>
            </h2>
             <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium transition-colors">
                 Hulbert & Sons is a family-owned home repair and renovation service providing reliable, effective, and high-quality work. We handle everything from small fixes to full home improvements. 
             </p>
          </RevealOnScroll>

          <div className="lg:grid lg:grid-cols-3 lg:gap-16 items-start">
            <RevealOnScroll delay={200} className="relative mb-12 lg:mb-0 lg:col-span-2">
              <AboutCarousel />
            </RevealOnScroll>
            
            <RevealOnScroll delay={400} className="lg:col-span-1 h-full">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-8 rounded-2xl border border-brandGold/20 h-full flex flex-col justify-center shadow-2xl hover:shadow-brandGold/10 transition-all duration-500 group">
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center transition-colors">
                     <Star className="w-6 h-6 text-brandGold mr-3 fill-current" />
                     Meet the Owner
                   </h3>
                   <div className="mb-4">
                     <span className="font-black text-slate-900 dark:text-white block text-2xl tracking-tight transition-colors">James Hulbert</span>
                   </div>
                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic mb-8 text-lg border-l-4 border-brandGold pl-4 py-2 transition-colors">
                     "I started this business with a simple belief: that homeowners deserve a handyman they can actually trust. I personally oversee our projects to ensure that the work we do on your home is the same quality I'd expect in my own."
                   </p>
                   
                   <button onClick={() => navigateTo('services')} className="bg-slate-900 dark:bg-slate-800 text-white py-4 px-6 rounded-xl font-black uppercase tracking-widest hover:bg-brandGold hover:text-slate-900 flex items-center justify-center group mt-auto transition-all shadow-lg hover:shadow-brandGold/20 border border-white/10">
                    Discover Services
                    <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Services Summary Section - Enhanced with diagonal gradient wash */}
      <section id="services-summary" className="py-24 bg-gradient-to-tr from-white via-slate-50 to-brandGold/5 dark:from-slate-950 dark:via-slate-900 dark:to-brandGold/5 relative border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-6 inline-block relative italic transition-colors">
              Our Expertise
              <span className="absolute bottom-1 left-0 w-full h-4 bg-brandGold/20 -z-10 rounded-full"></span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mt-2 transition-colors">
              Professional solutions for every corner of your property, delivered with precision.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Interior Card */}
            <RevealOnScroll delay={100} className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-slate-800 group hover:-translate-y-2">
              <div className="h-72 overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
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
                <p className="text-slate-900 dark:text-slate-100 mb-8 text-lg leading-relaxed font-black transition-colors">
                  Transform your living spaces with expert craftsmanship. From kitchen and bathroom remodels to custom carpentry, we handle all aspects of interior renovation.
                </p>
                <button onClick={() => navigateTo('services')} className="w-full bg-slate-900 dark:bg-slate-800 text-brandGold py-4 rounded-xl font-black uppercase tracking-widest border border-slate-900 dark:border-slate-700 hover:bg-brandGold hover:text-slate-900 transition-all flex items-center justify-center group shadow-xl shadow-slate-900/20">
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
                <button onClick={() => navigateTo('services')} className="w-full bg-slate-950 dark:bg-black text-brandGold py-4 rounded-xl font-black uppercase tracking-widest border border-slate-900 dark:border-slate-800 hover:bg-white hover:text-brandGold transition-all flex items-center justify-center group shadow-xl">
                  View Exterior Gallery <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Areas We Cover Section for NOLA */}
      <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex items-center gap-20">
            <div className="lg:w-1/2 mb-16 lg:mb-0">
              <RevealOnScroll>
                <div className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-slate-900 dark:text-brandGold uppercase bg-slate-100 dark:bg-brandGold/10 rounded-full border border-slate-200 dark:border-brandGold/20 transition-colors">
                    Regional Presence
                </div>
                <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight italic transition-colors">
                  Serving Greater <span className="text-brandGold">New Orleans</span> & The Northshore.
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed transition-colors font-medium">
                  From the historic French Quarter to the growing communities of the Northshore, Hulbert & Sons provides reliable home services across the entire Southeast Louisiana region.
                </p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {nolaServiceAreas.map((area, i) => (
                    <div key={i} className="flex items-center text-slate-800 dark:text-slate-200 font-bold group cursor-default transition-colors">
                      <div className="w-2 h-2 bg-brandGold rounded-full mr-3 group-hover:scale-150 transition-transform"></div>
                      {area.name}
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
            
            <div className="lg:w-1/2">
              <RevealOnScroll delay={200} className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square border-8 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                 {/* Leaflet Map Integration */}
                 <div className="w-full h-full">
                   <MapContainer 
                     center={[29.9511, -90.0715]} 
                     zoom={9} 
                     scrollWheelZoom={false}
                     className="w-full h-full"
                   >
                     <TileLayer
                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                       url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                     />
                     {nolaServiceAreas.map((area, idx) => (
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
                                 const el = document.getElementById('contact');
                                 el?.scrollIntoView({ behavior: 'smooth' });
                               }}
                               className="mt-3 text-[10px] font-black text-brandGold uppercase tracking-widest hover:underline"
                             >
                               Get NOLA Estimate
                             </button>
                           </div>
                         </Popup>
                       </Marker>
                     ))}
                   </MapContainer>
                 </div>
                 
                 <div className="absolute bottom-6 left-6 right-6 bg-slate-900/95 dark:bg-black/95 backdrop-blur-md p-6 rounded-2xl border-l-4 border-brandGold text-white shadow-2xl z-[500] pointer-events-none">
                    <p className="text-brandGold font-black uppercase text-[10px] tracking-widest mb-1">Live Service Map</p>
                    <p className="font-bold text-sm">Our crews are currently active in all listed Greater NOLA parishes.</p>
                 </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Testimonials Section for Home Page */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter uppercase italic transition-colors">
              Real Results. <span className="text-brandGold">Real Trust.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium transition-colors">Hear from homeowners across Louisiana and Texas who have experienced the Hulbert & Sons difference.</p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {homeTestimonials.map((testimonial, i) => (
              <RevealOnScroll key={i} delay={i * 150} className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 relative group hover:border-brandGold transition-all flex flex-col h-full">
                <Quote className="absolute top-6 right-8 w-10 h-10 text-brandGold/10 group-hover:text-brandGold/20 transition-colors" />
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brandGold fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-8 leading-relaxed font-medium flex-grow transition-colors">"{testimonial.text}"</p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50 dark:border-slate-700 transition-colors">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg ${
                    testimonial.branch === 'Houston' ? 'bg-slate-900 dark:bg-black' : 'bg-brandGold'
                  }`}>
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white leading-none transition-colors">{testimonial.name}</p>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5 flex items-center transition-colors">
                      <MapPin className="w-3 h-3 mr-1 text-brandGold" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                {testimonial.branch === 'Houston' && (
                  <div className="absolute top-4 left-8">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] bg-slate-900 dark:bg-black text-brandGold px-2 py-0.5 rounded-full border border-brandGold/30">Houston Branch</span>
                  </div>
                )}
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={500} className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 transition-colors">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest transition-colors">Join 500+ Satisfied Families This Year</span>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 dark:bg-black relative overflow-hidden transition-colors duration-500">
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
                    <div className="absolute top-full left-0 mt-4 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-brandGold/20 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-4 bg-slate-900 dark:bg-black text-white border-b border-white/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-brandGold">Direct Dial Selection</p>
                      </div>
                      <div className="p-2">
                        <a href="tel:5044527895" className="flex items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                          <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                            <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Orleans, LA</p>
                            <p className="font-bold text-slate-900 dark:text-white transition-colors">(504) 452-7895</p>
                          </div>
                        </a>
                        <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
                        <a href="tel:2815777533" className="flex items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group">
                          <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold transition-colors">
                            <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Houston, TX</p>
                            <p className="font-bold text-slate-900 dark:text-white transition-colors">(281) 577-7533</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-12 p-8 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-3xl border border-brandGold/20 backdrop-blur-sm shadow-2xl transition-all">
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