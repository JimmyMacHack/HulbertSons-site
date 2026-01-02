import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Facebook, ShieldCheck } from 'lucide-react';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import HoustonPage from './components/HoustonPage';
import AIChatWidget from './components/AIChatWidget';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPhoneDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        ${isActive ? 'text-brandGold' : 'text-slate-800 hover:text-brandGold'}
      `}
    >
      {label}
      <span className={`
        absolute bottom-0 left-0 h-0.5 bg-brandGold transition-all duration-300 ease-out
        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
      `}></span>
    </button>
  );

  return (
    <div className="font-sans text-gray-800 bg-slate-50 min-h-screen flex flex-col">
      {/* Top Bar - Simplified Contact Info */}
      <div className="bg-slate-900 text-gray-300 py-2.5 px-4 text-[10px] md:text-xs hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="mailto:Hello@Hulbertsons.com" className="flex items-center hover:text-brandGold transition-colors font-black uppercase tracking-[0.2em] group">
              <Mail className="w-3.5 h-3.5 mr-2 text-brandGold group-hover:scale-110 transition-transform" />
              Hello@Hulbertsons.com
            </a>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 font-black tracking-widest uppercase italic">Quality Work • Honest Pricing • Family Owned</span>
            <span className="text-brandGold font-black tracking-widest uppercase bg-brandGold/10 px-3 py-1 rounded-full animate-pulse text-[9px]">Houston branch now open!</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-white via-slate-50 to-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.2)] py-2 border-b border-brandGold/20' 
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
              <button 
                onClick={() => navigateTo('houston')}
                className={`font-black text-sm uppercase tracking-widest px-4 py-2 rounded-lg border-2 border-brandGold transition-all ${
                  currentPage === 'houston' ? 'bg-brandGold text-slate-900' : 'text-brandGold hover:bg-brandGold hover:text-slate-900'
                }`}
              >
                Houston TX
              </button>
              
              {/* Contact Dropdown Selector */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                  className="bg-brandGold hover:bg-slate-900 hover:text-white text-slate-900 font-black py-3 px-7 rounded-xl transition-all shadow-lg hover:shadow-brandGold/20 flex items-center transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-widest text-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isPhoneDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPhoneDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-brandGold/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 bg-slate-900 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brandGold opacity-80 mb-1">Get in touch</p>
                      <h4 className="text-sm font-bold italic">How can we help today?</h4>
                    </div>
                    <div className="p-2">
                      <a 
                        href="tel:5044527895"
                        className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold group-hover:text-slate-900 transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">New Orleans, LA</p>
                          <p className="font-bold text-slate-900">(504) 452-7895</p>
                        </div>
                      </a>
                      <div className="h-px bg-slate-100 mx-4"></div>
                      <a 
                        href="tel:2815777533"
                        className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold group-hover:text-slate-900 transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Houston, TX</p>
                          <p className="font-bold text-slate-900">(281) 577-7533</p>
                        </div>
                      </a>
                      <div className="h-px bg-slate-100 mx-4"></div>
                      <a 
                        href="mailto:Hello@Hulbertsons.com"
                        className="flex items-center p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold group-hover:text-slate-900 transition-colors">
                          <Mail className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Branch</p>
                          <p className="font-bold text-slate-900">Hello@Hulbertsons.com</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                      <button 
                        onClick={() => { navigateTo('home', 'contact'); setIsPhoneDropdownOpen(false); }}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brandGold transition-colors"
                      >
                        Send a detailed message instead
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-slate-900 hover:text-brandGold focus:outline-none p-2 bg-slate-100 rounded-lg">
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-2xl animate-in slide-in-from-top-5 z-40">
            <div className="px-4 pt-2 pb-8 space-y-1">
              <button onClick={() => navigateTo('home')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 hover:bg-slate-50 hover:text-brandGold transition-colors">Home</button>
              <button onClick={() => navigateTo('services')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 hover:bg-slate-50 hover:text-brandGold transition-colors">Services</button>
              <button onClick={() => navigateTo('houston')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-black uppercase tracking-widest text-brandGold bg-brandGold/5 hover:bg-brandGold hover:text-slate-900 transition-all">Houston TX Branch</button>
              <button onClick={() => navigateTo('home', 'about')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 hover:bg-slate-50 hover:text-brandGold transition-colors">About Us</button>
              
              <div className="pt-4 space-y-2">
                <a href="tel:5044527895" className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm">
                  <span>NOLA Call</span>
                  <span>(504) 452-7895</span>
                </a>
                <a href="tel:2815777533" className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-brandGold text-slate-900 font-black uppercase tracking-widest text-sm">
                  <span>Houston Call</span>
                  <span>(281) 577-7533</span>
                </a>
                <a href="mailto:Hello@Hulbertsons.com" className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-slate-100 text-slate-900 font-black uppercase tracking-widest text-sm border border-slate-200">
                  <span>Email Us</span>
                  <span className="text-[10px]">Hello@Hulbertsons.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {currentPage === 'home' ? (
          <HomePage navigateTo={navigateTo} />
        ) : currentPage === 'services' ? (
          <ServicesPage navigateTo={navigateTo} />
        ) : (
          <HoustonPage navigateTo={navigateTo} />
        )}
      </main>

      <AIChatWidget />

      <footer className="bg-gradient-to-br from-slate-900 via-slate-950 to-black text-slate-400 py-16 border-t-4 border-brandGold relative shadow-[0_-10px_50px_rgba(234,179,8,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-3xl font-black text-white tracking-tighter uppercase leading-none block mb-6">
                Hulbert <span className="text-brandGold">&</span> Sons
              </span>
              <p className="mb-8 max-w-sm text-lg leading-relaxed font-medium">
                Restoring the functionality of your home with quality work, honest pricing, and family values since day one. Now proudly serving both the New Orleans and Greater Houston areas.
              </p>
              <div className="flex space-x-5">
                <a 
                  href="https://www.facebook.com/HulbertSons" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-brandGold hover:text-slate-900 transition-all cursor-pointer transform hover:scale-110 shadow-lg"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-brandGold hover:text-slate-900 transition-all cursor-pointer transform hover:scale-110 shadow-lg">
                  <span className="font-bold text-xl">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-b border-slate-800 pb-2">Quick Links</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider">
                <li><button onClick={() => navigateTo('home')} className="hover:text-brandGold transition-colors text-left hover:translate-x-2 transform duration-300 block">Home</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-brandGold transition-colors text-left hover:translate-x-2 transform duration-300 block">NOLA Services</button></li>
                <li><button onClick={() => navigateTo('houston')} className="text-brandGold hover:text-white transition-colors text-left hover:translate-x-2 transform duration-300 block">Houston TX Branch</button></li>
                <li><button onClick={() => navigateTo('home', 'contact')} className="hover:text-brandGold transition-colors text-left hover:translate-x-2 transform duration-300 block">Get Estimate</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-b border-slate-800 pb-2">Locations</h4>
              <ul className="space-y-5 text-sm">
                <li className="flex items-start group">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-brandGold group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed text-slate-300 font-medium">Serving Greater New Orleans<br />& Surrounding Areas</span>
                </li>
                <li className="flex items-start group">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-brandGold group-hover:scale-110 transition-transform" />
                  <span className="leading-relaxed text-slate-300 font-medium italic">Greater Houston & Texas<br />Surrounding Areas</span>
                </li>
                <li className="flex flex-col space-y-2 pt-2">
                  <a href="tel:5044527895" className="flex items-center group">
                    <Phone className="w-5 h-5 mr-3 text-brandGold group-hover:scale-110 transition-transform" />
                    <span className="font-black text-white tracking-tight">LA: (504) 452-7895</span>
                  </a>
                  <a href="tel:2815777533" className="flex items-center group">
                    <Phone className="w-5 h-5 mr-3 text-brandGold group-hover:scale-110 transition-transform" />
                    <span className="font-black text-white tracking-tight">TX: (281) 577-7533</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-10 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase font-black text-slate-500">
            <p>&copy; {new Date().getFullYear()} Hulbert & Sons. Built with Integrity. Serving LA & TX.</p>
            <p className="mt-4 md:mt-0 text-brandGold/50 hover:text-brandGold transition-colors cursor-default">Professional Handyman Services</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;