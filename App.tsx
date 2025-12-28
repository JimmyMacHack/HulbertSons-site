import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import AIChatWidget from './components/AIChatWidget';
import HoustonPage from "./HoustonPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateTo = (page: string, sectionId: string | null = null) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    
    // If navigating to a section within the home page, wait for render then scroll
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const MenuItem = ({ label, page, sectionId, isActive }: { label: string, page: string, sectionId?: string, isActive?: boolean }) => (
    <button 
      onClick={() => navigateTo(page, sectionId)} 
      className={`
        relative font-bold text-sm uppercase tracking-widest px-2 py-1 transition-colors duration-300 group
        ${isActive ? 'text-yellow-600' : 'text-slate-800 hover:text-yellow-600'}
      `}
    >
      {label}
      <span className={`
        absolute bottom-0 left-0 h-0.5 bg-yellow-500 transition-all duration-300 ease-out
        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
      `}></span>
    </button>
  );

  return (
    <div className="font-sans text-gray-800 bg-slate-50 min-h-screen flex flex-col">
      {/* Top Bar - Contact Info */}
      <div className="bg-slate-900 text-gray-300 py-2.5 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="mailto:Jameshulbert59@gmail.com" className="flex items-center hover:text-yellow-400 transition-colors font-bold uppercase tracking-wider group">
              <Mail className="w-4 h-4 mr-2 text-yellow-500 group-hover:scale-110 transition-transform" />
              Email
            </a>
            <a href="tel:5044527895" className="flex items-center hover:text-yellow-400 transition-colors font-bold uppercase tracking-wider group">
              <Phone className="w-4 h-4 mr-2 text-yellow-500 group-hover:scale-110 transition-transform" />
              Call Now
            </a>
          </div>
          <div className="text-xs text-slate-500 font-bold tracking-widest uppercase flex items-center gap-4">
            <span>Serving New Orleans & Surrounding Areas</span>
            <span className="text-[#EAB207] border-l border-slate-700 pl-4 animate-pulse uppercase italic">Houston branch coming soon!</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-white via-slate-50 to-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.2)] py-2 border-b border-yellow-500/20' 
          : 'bg-gradient-to-r from-slate-50/95 via-white/95 to-slate-50/95 backdrop-blur-md py-4 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24 px-4">
            <div className="flex-shrink-0 flex items-center cursor-pointer transform hover:scale-105 transition-transform" onClick={() => navigateTo('home')}>
              <img 
                src="https://i.ibb.co/8HxmFMJ/IMG-4217.png" 
                alt="Hulbert & Sons Home Services" 
                className="h-12 md:h-20 w-auto max-w-[250px] md:max-w-[300px] object-contain"
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <MenuItem label="Home" page="home" isActive={currentPage === 'home'} />
              <MenuItem label="About Us" page="home" sectionId="about" />
              <MenuItem label="Services" page="services" isActive={currentPage === 'services'} />
              <button onClick={() => navigateTo('home', 'contact')} className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 px-7 rounded-xl transition-all shadow-lg hover:shadow-yellow-500/20 flex items-center transform hover:-translate-y-0.5 active:scale-95">
                <Phone className="w-4 h-4 mr-2" />
                (504) 452-7895
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-slate-900 hover:text-yellow-500 focus:outline-none p-2 bg-slate-100 rounded-lg">
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl animate-in slide-in-from-top-5 z-40">
            <div className="px-4 pt-2 pb-8 space-y-1">
              <button onClick={() => navigateTo('home')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 hover:bg-slate-50 hover:text-yellow-600 transition-colors">Home</button>
              <button onClick={() => navigateTo('services')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 hover:bg-slate-50 hover:text-yellow-600 transition-colors">Services</button>
              <button onClick={() => navigateTo('home', 'about')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 hover:bg-slate-50 hover:text-yellow-600 transition-colors">About Us</button>
              <button onClick={() => navigateTo('home', 'contact')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors mt-2">Contact Us</button>
              
              <div className="px-4 py-4 mt-4 border-t border-slate-100">
                <p className="text-xs font-black uppercase tracking-widest text-[#EAB207] italic animate-pulse">
                  <MapPin className="inline-block w-3 h-3 mr-1" /> Houston branch coming soon!
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {currentPage === 'home' ? <HomePage navigateTo={navigateTo} /> : <ServicesPage navigateTo={navigateTo} />}
      </main>

      <AIChatWidget />

      <footer className="bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-400 py-16 border-t-4 border-yellow-500 relative shadow-[0_-10px_50px_rgba(234,179,8,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-3xl font-black text-white tracking-tighter uppercase leading-none block mb-6">
                Hulbert <span className="text-yellow-500">&</span> Sons
              </span>
              <p className="mb-8 max-w-sm text-lg leading-relaxed">
                Restoring the functionality of your home with quality work, honest pricing, and family values since day one.
              </p>
              <div className="flex space-x-5">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all cursor-pointer transform hover:scale-110 shadow-lg">
                  <span className="font-bold text-xl">f</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-yellow-500 hover:text-slate-900 transition-all cursor-pointer transform hover:scale-110 shadow-lg">
                  <span className="font-bold text-xl">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-b border-slate-800 pb-2">Services</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => navigateTo('services')} className="hover:text-yellow-500 transition-colors text-left hover:translate-x-2 transform duration-300 block">Residential Repairs</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-yellow-500 transition-colors text-left hover:translate-x-2 transform duration-300 block">Commercial Maintenance</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-yellow-500 transition-colors text-left hover:translate-x-2 transform duration-300 block">Interior Renovations</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-yellow-500 transition-colors text-left hover:translate-x-2 transform duration-300 block">Roofing & Exteriors</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-b border-slate-800 pb-2">Contact</h4>
              <ul className="space-y-5 text-sm">
                <li className="flex items-start group">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed text-slate-300">Serving Greater New Orleans<br />& Surrounding Areas</span>
                </li>
                <li className="flex items-center group">
                  <Phone className="w-5 h-5 mr-3 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-white tracking-tight">(504) 452-7895</span>
                </li>
                <li className="flex items-center group">
                  <Mail className="w-5 h-5 mr-3 text-yellow-500 group-hover:scale-110 transition-transform" />
                  <span className="hover:text-white transition-colors">Jameshulbert59@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase font-bold text-slate-500">
            <p>&copy; {new Date().getFullYear()} Hulbert & Sons. Built with Integrity.</p>
            <p className="mt-4 md:mt-0 text-yellow-500/50 hover:text-yellow-500 transition-colors cursor-default">Professional Handyman Services</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
