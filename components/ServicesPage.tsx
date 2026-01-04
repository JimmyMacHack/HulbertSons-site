import React, { useState } from 'react';
import { ArrowLeft, PaintBucket, Hammer, Repeat, Star } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface ServicesPageProps {
  navigateTo: (page: string, sectionId?: string | null) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ navigateTo }) => {
  const interiorProjects = [
    {
      title: "Bathroom Remodel & Tub Installation",
      category: "Interior",
      description: "Modernizing bathrooms with professional tub installations, custom tile work, and upgraded fixtures for a fresh, clean look.",
      beforeImg: "https://i.ibb.co/qYx1qNND/IMG-3860.jpg", 
      afterImg: "https://i.ibb.co/whSsRf9s/IMG-3865.jpg",
      theme: 'light'
    },
    {
      title: "Plumbing Repair & Drain Line Replacement",
      category: "Interior",
      description: "Expert diagnosis and repair of plumbing issues, including complete drain line replacements to ensure your home's systems run smoothly.",
      beforeImg: "https://i.ibb.co/tpLF3qY4/Attachment-14.jpg",
      afterImg: "https://i.ibb.co/d0y0cDN1/Attachment-6.jpg",
      theme: 'light'
    },
    {
      title: "Water Heater Installation & Replacement",
      category: "Interior",
      description: "Installation of new efficient water heaters and replacement of old units to ensure your family always has reliable hot water.",
      beforeImg: "https://i.ibb.co/yccLnsdS/IMG-2359.jpg",
      afterImg: "https://i.ibb.co/ZptnpDrQ/IMG-2358.jpg",
      theme: 'light'
    },
    {
      title: "Subfloor Repair & Flooring Installation",
      category: "Interior",
      description: "Restoring structural integrity by repairing damaged subfloors, followed by the installation of beautiful hardwood, laminate, or tile.",
      beforeImg: "https://i.ibb.co/rRyHnR6K/Attachment-13.jpg",
      afterImg: "https://i.ibb.co/hQCWYKg/Attachment-12.jpg",
      theme: 'light'
    },
    {
      title: "Furniture Repair & Restoration",
      category: "Interior",
      description: "A specialty service for cherished pieces. We repair structural damage and restore the finish to bring your furniture back to life.",
      beforeImg: "https://i.ibb.co/mrcPKW9v/IMG-2328.jpg",
      afterImg: "https://i.ibb.co/S4NPM8YT/IMG-2329.jpg",
      theme: 'light'
    }
  ];

  const exteriorProjects = [
    {
      title: "Fence Repair & Replacement",
      category: "Exterior",
      description: "Securing your property and enhancing privacy with sturdy fence repairs or complete replacements using high-quality materials.",
      beforeImg: "https://i.ibb.co/ZpjpV90Q/Attachment-7.jpg",
      afterImg: "https://i.ibb.co/G47VQLr4/Attachment-8.jpg",
      theme: 'dark'
    },
    {
      title: "Concrete Repair & Crack Sealing",
      category: "Exterior",
      description: "Repairing driveways, walkways, and foundations to prevent further water damage and improve the safety and look of your concrete surfaces.",
      beforeImg: "https://i.ibb.co/fVNg174h/Attachment-9.jpg",
      afterImg: "https://i.ibb.co/jkst9rgk/Attachment-5.jpg",
      theme: 'dark'
    },
    {
      title: "Roof Repair & Vent Installation",
      category: "Exterior",
      description: "Handling minor roof leaks, replacing damaged shingles, and installing proper ventilation to protect your home from moisture.",
      beforeImg: "https://i.ibb.co/XHNFkKB/IMG-2344.jpg",
      afterImg: "https://i.ibb.co/RGCgCsTm/IMG-2340.jpg",
      theme: 'dark'
    }
  ];

  const ProjectCard: React.FC<{ project: any }> = ({ project }) => {
    const isDark = project.theme === 'dark';
    
    return (
      <RevealOnScroll className={`rounded-[2.5rem] shadow-2xl overflow-hidden mb-16 transform hover:scale-[1.01] transition-all duration-700 border-2 ${
        isDark 
          ? 'bg-slate-900 border-white/5 shadow-brandGold/5' 
          : 'bg-brandGold border-slate-900/10 shadow-brandGold/20'
      }`}>
        <div className={`p-8 md:p-12 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 opacity-[0.05] pointer-events-none transform translate-x-1/4 -translate-y-1/4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
             <Star className="w-full h-full fill-current" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`inline-flex items-center px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase rounded-full shadow-sm ${
                isDark 
                  ? 'text-brandGold bg-brandGold/10 border border-brandGold/20' 
                  : 'text-white bg-slate-900/90 border border-slate-900/10'
              }`}>
                {project.category}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 fill-current ${isDark ? 'text-brandGold' : 'text-slate-900'}`} />
                ))}
              </div>
            </div>

            <h3 className={`text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {project.title}
            </h3>
            
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-900/70'
            }`}>
              {project.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 p-4 pt-0">
          <div className="relative h-80 md:h-[500px] rounded-[1.5rem] overflow-hidden group shadow-inner bg-slate-100 dark:bg-slate-800">
            <img 
              src={project.beforeImg} 
              alt="Before Restoration" 
              loading="lazy" 
              className="w-full h-full object-cover grayscale-[40%] transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md text-white px-6 py-2 rounded-xl font-black tracking-widest text-xs shadow-2xl">
              BEFORE
            </div>
          </div>
          <div className={`relative h-80 md:h-[500px] rounded-[1.5rem] overflow-hidden group shadow-2xl ${isDark ? 'border-2 border-brandGold/30' : 'border-2 border-slate-900/10 dark:border-white/10'}`}>
            <img 
              src={project.afterImg} 
              alt="After Hulbert & Sons Restoration" 
              loading="lazy" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
            
            <div className={`absolute top-6 left-6 px-7 py-3 rounded-xl font-black tracking-widest text-sm shadow-2xl border-b-4 ${
              isDark 
                ? 'bg-brandGold text-slate-900 border-slate-900/20' 
                : 'bg-slate-900 text-white border-white/10'
            }`}>
              AFTER
            </div>

            <div className="absolute bottom-6 right-6 transform rotate-12 scale-0 group-hover:scale-100 transition-transform duration-500">
               <div className={`p-4 rounded-full shadow-2xl border-2 flex flex-col items-center justify-center ${
                 isDark ? 'bg-white text-slate-900 border-brandGold' : 'bg-slate-900 text-white border-brandGold'
               }`}>
                  <span className="text-[10px] font-black uppercase leading-none">Quality</span>
                  <span className={`text-[10px] font-black uppercase leading-none text-brandGold`}>Assured</span>
               </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-32 transition-colors duration-500">
      <div className="relative bg-slate-900 text-white py-32 md:py-48 px-4 overflow-hidden border-b-8 border-brandGold shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src="https://i.ibb.co/fz7FMNMx/IMG-2349.jpg" 
            alt="Craftsmanship Background" 
            className="w-full h-full object-cover opacity-20 scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900 to-slate-950"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <RevealOnScroll className="flex flex-col items-center">
            <div className="inline-block px-4 py-1.5 mb-8 text-xs font-black tracking-[0.4em] text-brandGold uppercase bg-brandGold/10 rounded-full border border-brandGold/20">
                Visual Portfolio
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 uppercase italic leading-none drop-shadow-2xl">
              Family <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandGold to-yellow-200">Craft</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-300 font-medium italic max-w-3xl leading-relaxed opacity-90">
              A detailed transformation gallery showcasing quality restorations across Louisiana and Texas.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-brandGold/20 font-black tracking-widest uppercase text-xs transition-all border border-slate-100 dark:border-slate-700 group"
          >
            <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" /> Back to home
          </button>
          
          <div className="flex gap-4">
            <div className="bg-slate-900 dark:bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 shadow-xl border border-white/5">
              <div className="w-2 h-2 bg-brandGold rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest">Real Results Verified</span>
            </div>
          </div>
        </div>

        <div className="mb-32">
          <RevealOnScroll className="mb-20">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-6 mb-6">
                <div className="bg-brandGold p-6 rounded-[2rem] shadow-xl border border-slate-900/10">
                  <PaintBucket className="w-12 h-12 text-slate-900" />
                </div>
                <div>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Interior Mastery</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.3em] text-xs mt-3">Refining every detail within your home</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          
          <div className="space-y-12">
            {interiorProjects.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>
        </div>

        <div>
          <RevealOnScroll className="mb-20">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-6 mb-6">
                <div className="bg-slate-900 p-6 rounded-[2rem] shadow-2xl border-b-4 border-brandGold">
                  <Hammer className="w-12 h-12 text-brandGold" />
                </div>
                <div>
                  <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Exterior Protection</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.3em] text-xs mt-3">Built to endure the elements</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
          
          <div className="space-y-12">
            {exteriorProjects.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>
        </div>

        <RevealOnScroll className="mt-32">
           <div className="bg-slate-900 dark:bg-black rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border-4 border-brandGold shadow-2xl">
              <div className="absolute inset-0 opacity-10 bg-[url('https://i.ibb.co/fz7FMNMx/IMG-2349.jpg')] bg-cover bg-center"></div>
              <div className="relative z-10">
                 <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
                    Ready to Start Your <span className="text-brandGold">Transformation?</span>
                 </h2>
                 <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
                    Our team is ready to bring this level of quality to your home. Contact us today for a professional estimate.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button 
                      onClick={() => navigateTo('home', 'contact')}
                      className="bg-brandGold text-slate-900 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-white transition-all shadow-2xl transform hover:-translate-y-1"
                    >
                      Get Started
                    </button>
                    <button 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-white/5 text-white border border-white/20 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-white/10 transition-all"
                    >
                      Back to Top
                    </button>
                 </div>
              </div>
           </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default ServicesPage;