import React from 'react';
import { ArrowLeft, PaintBucket, Hammer } from 'lucide-react';
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
      theme: 'navy'
    },
    {
      title: "Plumbing Repair & Drain Line Replacement",
      category: "Interior",
      description: "Expert diagnosis and repair of plumbing issues, including complete drain line replacements to ensure your home's systems run smoothly.",
      beforeImg: "https://i.ibb.co/tpLF3qY4/Attachment-14.jpg",
      afterImg: "https://i.ibb.co/d0y0cDN1/Attachment-6.jpg",
      theme: 'white'
    },
    {
      title: "Water Heater Installation & Replacement",
      category: "Interior",
      description: "Installation of new efficient water heaters and replacement of old units to ensure your family always has reliable hot water.",
      beforeImg: "https://i.ibb.co/yccLnsdS/IMG-2359.jpg",
      afterImg: "https://i.ibb.co/ZptnpDrQ/IMG-2358.jpg",
      theme: 'gold'
    },
    {
      title: "Subfloor Repair & Flooring Installation",
      category: "Interior",
      description: "Restoring structural integrity by repairing damaged subfloors, followed by the installation of beautiful hardwood, laminate, or tile.",
      beforeImg: "https://i.ibb.co/rRyHnR6K/Attachment-13.jpg",
      afterImg: "https://i.ibb.co/hQCWYKg/Attachment-12.jpg",
      theme: 'white'
    },
    {
      title: "Furniture Repair & Restoration",
      category: "Interior",
      description: "A specialty service for cherished pieces. We repair structural damage and restore the finish to bring your furniture back to life.",
      beforeImg: "https://i.ibb.co/mrcPKW9v/IMG-2328.jpg",
      afterImg: "https://i.ibb.co/S4NPM8YT/IMG-2329.jpg",
      theme: 'navy'
    }
  ];

  const exteriorProjects = [
    {
      title: "Fence Repair & Replacement",
      category: "Exterior",
      description: "Securing your property and enhancing privacy with sturdy fence repairs or complete replacements using high-quality materials.",
      beforeImg: "https://i.ibb.co/ZpjpV90Q/Attachment-7.jpg",
      afterImg: "https://i.ibb.co/G47VQLr4/Attachment-8.jpg",
      theme: 'gold'
    },
    {
      title: "Concrete Repair & Crack Sealing",
      category: "Exterior",
      description: "Repairing driveways, walkways, and foundations to prevent further water damage and improve the safety and look of your concrete surfaces.",
      beforeImg: "https://i.ibb.co/fVNg174h/Attachment-9.jpg",
      afterImg: "https://i.ibb.co/jkst9rgk/Attachment-5.jpg",
      theme: 'navy'
    },
    {
      title: "Roof Repair & Vent Installation",
      category: "Exterior",
      description: "Handling minor roof leaks, replacing damaged shingles, and installing proper ventilation to protect your home from moisture.",
      beforeImg: "https://i.ibb.co/XHNFkKB/IMG-2344.jpg",
      afterImg: "https://i.ibb.co/RGCgCsTm/IMG-2340.jpg",
      theme: 'gold'
    }
  ];

  const ProjectCard = ({ project }: { project: any }) => {
    const isNavy = project.theme === 'navy';
    const isGold = project.theme === 'gold';
    
    return (
      <RevealOnScroll className={`rounded-2xl shadow-xl overflow-hidden mb-12 transform hover:scale-[1.01] transition-all duration-500 ${
        isNavy ? 'bg-slate-900 border-t-4 border-brandGold' : 
        isGold ? 'bg-brandGold border-t-4 border-slate-900' : 
        'bg-white border-t-4 border-slate-200'
      }`}>
        <div className={`p-6 md:p-8 border-b ${
          isNavy ? 'border-slate-800' : isGold ? 'border-[#d4a006]' : 'border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <span className={`inline-block px-3 py-1 mb-3 text-xs font-black tracking-widest uppercase rounded-full ${
                isNavy ? 'text-brandGold bg-brandGold/10' : 
                isGold ? 'text-white bg-slate-950/20' : 
                'text-slate-800 bg-slate-100'
              }`}>
                {project.category}
              </span>
              <h3 className={`text-2xl md:text-3xl font-black tracking-tighter uppercase italic ${
                isNavy ? 'text-white' : isGold ? 'text-white drop-shadow-md' : 'text-slate-900'
              }`}>{project.title}</h3>
            </div>
          </div>
          <p className={`mt-3 text-lg leading-relaxed ${
            isNavy ? 'text-slate-300' : isGold ? 'text-white font-black drop-shadow-sm' : 'text-slate-600'
          }`}>{project.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border-t border-white/10">
          <div className="relative h-72 md:h-96 group overflow-hidden border-r border-white/10">
            <img src={project.beforeImg} alt="Before" loading="lazy" className="w-full h-full object-cover grayscale-[30%]" />
            <div className="absolute top-4 left-4 bg-slate-900/90 text-white px-5 py-2 rounded-lg font-black tracking-widest text-xs">BEFORE</div>
          </div>
          <div className="relative h-72 md:h-96 group overflow-hidden">
            <img src={project.afterImg} alt="After" loading="lazy" className="w-full h-full object-cover" />
            <div className={`absolute top-4 left-4 px-5 py-2 rounded-lg font-black tracking-widest text-xs shadow-xl ${
              isGold ? 'bg-slate-950 text-brandGold' : 'bg-brandGold text-slate-900'
            }`}>AFTER</div>
          </div>
        </div>
      </RevealOnScroll>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-yellow-50/10 to-white min-h-screen pb-20">
      <div className="relative bg-slate-900 text-white py-24 md:py-32 px-4 overflow-hidden border-b-4 border-brandGold shadow-2xl">
        <div className="absolute inset-0">
          <img src="https://i.ibb.co/fz7FMNMx/IMG-2349.jpg" alt="Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic drop-shadow-2xl">Craftsmanship</h1>
          <p className="text-xl md:text-2xl text-brandGold font-bold italic drop-shadow-md">
            Transformation gallery: Quality restorations across New Orleans and Houston.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <button onClick={() => navigateTo('home')} className="flex items-center text-slate-500 hover:text-brandGold font-black tracking-widest uppercase text-sm mb-12 transition-all">
          <ArrowLeft className="w-5 h-5 mr-2" /> Home
        </button>

        <div className="mb-24">
          <RevealOnScroll>
            <div className="flex items-center mb-12 bg-white p-8 rounded-3xl shadow-xl border-l-8 border-brandGold">
              <div className="bg-brandGold/10 p-5 rounded-2xl mr-6">
                <PaintBucket className="w-10 h-10 text-brandGold" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Interior Mastery</h2>
            </div>
          </RevealOnScroll>
          {interiorProjects.map((p, i) => <ProjectCard key={i} project={p} />)}
        </div>

        <div>
          <RevealOnScroll>
            <div className="flex items-center mb-12 bg-slate-900 p-8 rounded-3xl shadow-2xl border-l-8 border-brandGold">
              <div className="bg-brandGold p-5 rounded-2xl mr-6">
                <Hammer className="w-10 h-10 text-slate-900" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">Exterior Protection</h2>
            </div>
          </RevealOnScroll>
          {exteriorProjects.map((p, i) => <ProjectCard key={i} project={p} />)}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;