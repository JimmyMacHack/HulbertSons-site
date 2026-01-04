import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, Facebook, ShieldCheck } from 'lucide-react';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import HoustonPage from './components/HoustonPage';
import AIChatWidget from './components/AIChatWidget';
import BackToTop from './components/BackToTop';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync dark mode class with state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

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
        ${isActive ? 'text-brandGold' : 'text-slate-800 dark:text-slate-300 hover:text-brandGold dark:hover:text-brandGold'}
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
    <div className={`font-sans transition-colors duration-500 min-h-screen flex flex-col selection:bg-brandGold selection:text-slate-900 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-gray-800'}`}>
      {/* Top Bar - Simplified Contact Info */}
      <div className="bg-slate-900 dark:bg-black text-gray-300 py-2.5 px-4 text-[10px] md:text-xs hidden md:block border-b border-white/5 relative z-50">
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

      {/* Main Navigation - Enhanced with Gradient and pronounced scroll effect */}
      <nav className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] py-2 border-b border-brandGold/40' 
          : 'bg-gradient-to-r from-slate-50/90 via-white/90 to-slate-50/90 dark:from-slate-950/90 dark:via-slate-900/90 dark:to-slate-950/90 backdrop-blur-xl py-4 border-b border-slate-200 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24 px-4">
            <div className="flex-shrink-0 flex items-center cursor-pointer transform hover:scale-105 transition-transform" onClick={() => navigateTo('home')}>
              <img 
                src="https://i.ibb.co/8HxmFMJ/IMG-4217.png" 
                alt="Hulbert & Sons Home Services" 
                className={`h-12 md:h-20 w-auto max-w-[250px] md:max-w-[300px] object-contain transition-all duration-500 ${isDarkMode ? 'brightness-125' : ''}`}
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <MenuItem label="Home" page="home" isActive={currentPage === 'home'} />
              <MenuItem label="About Us" page="home" sectionId="about" />
              <MenuItem label="Services" page="services" isActive={currentPage === 'services'} />
              
              {/* Branch Toggle Button */}
              <button 
                onClick={() => currentPage === 'houston' ? navigateTo('home') : navigateTo('houston')}
                className={`font-black text-sm uppercase tracking-widest px-4 py-2 rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 ${
                  currentPage === 'houston' 
                    ? 'bg-slate-900 dark:bg-slate-800 text-brandGold border-slate-900 dark:border-slate-700 shadow-xl shadow-slate-900/20 hover:bg-slate-800 dark:hover:bg-slate-700' 
                    : 'border-brandGold text-brandGold hover:bg-brandGold hover:text-slate-900 shadow-lg shadow-brandGold/5'
                }`}
              >
                {currentPage === 'houston' ? 'New Orleans LA' : 'Houston TX'}
              </button>
              
              {/* Contact Dropdown Selector */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                  className="bg-slate-900 dark:bg-slate-800 text-brandGold hover:bg-brandGold hover:text-slate-900 font-black py-3.5 px-7 rounded-xl transition-all shadow-xl hover:shadow-brandGold/20 flex items-center transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-widest text-sm border border-brandGold/20 dark:border-brandGold/30"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                  <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${isPhoneDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPhoneDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-brandGold/30 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 bg-slate-900 dark:bg-black text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brandGold opacity-80 mb-1">Get in touch</p>
                      <h4 className="text-sm font-bold italic">How can we help today?</h4>
                    </div>
                    <div className="p-2">
                      <a 
                        href="tel:5044527895"
                        className="flex items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold group-hover:text-slate-900 transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">New Orleans, LA</p>
                          <p className="font-bold text-slate-900 dark:text-white">(504) 452-7895</p>
                        </div>
                      </a>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
                      <a 
                        href="tel:2815777533"
                        className="flex items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold group-hover:text-slate-900 transition-colors">
                          <MapPin className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Houston, TX</p>
                          <p className="font-bold text-slate-900 dark:text-white">(281) 577-7533</p>
                        </div>
                      </a>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4"></div>
                      <a 
                        href="mailto:Hello@Hulbertsons.com"
                        className="flex items-center p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                      >
                        <div className="bg-brandGold/10 p-2 rounded-lg mr-4 group-hover:bg-brandGold group-hover:text-slate-900 transition-colors">
                          <Mail className="w-4 h-4 text-brandGold group-hover:text-slate-900" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Email Branch</p>
                          <p className="font-bold text-slate-900 dark:text-white">Hello@Hulbertsons.com</p>
                        </div>
                      </a>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 text-center">
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
              <button onClick={toggleMenu} className="text-slate-900 dark:text-slate-100 hover:text-brandGold focus:outline-none p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 absolute w-full shadow-2xl animate-in slide-in-from-top-5 z-40">
            <div className="px-4 pt-2 pb-8 space-y-1">
              <button onClick={() => navigateTo('home')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandGold transition-colors">Home</button>
              <button onClick={() => navigateTo('services')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandGold transition-colors">Services</button>
              
              <button 
                onClick={() => currentPage === 'houston' ? navigateTo('home') : navigateTo('houston')} 
                className={`block w-full text-left px-4 py-4 rounded-xl text-base font-black uppercase tracking-widest transition-all ${
                  currentPage === 'houston' 
                    ? 'bg-slate-900 dark:bg-slate-800 text-brandGold' 
                    : 'text-brandGold bg-brandGold/5 hover:bg-brandGold hover:text-slate-900'
                }`}
              >
                {currentPage === 'houston' ? 'New Orleans LA Branch' : 'Houston TX Branch'}
              </button>
              
              <button onClick={() => navigateTo('home', 'about')} className="block w-full text-left px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wide text-gray-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brandGold transition-colors">About Us</button>
              
              <div className="pt-4 space-y-2">
                <a href="tel:5044527895" className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest text-sm">
                  <span>NOLA Call</span>
                  <span>(504) 452-7895</span>
                </a>
                <a href="tel:2815777533" className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-brandGold text-slate-900 font-black uppercase tracking-widest text-sm">
                  <span>Houston Call</span>
                  <span>(281) 577-7533</span>
                </a>
                <a href="mailto:Hello@Hulbertsons.com" className="flex items-center justify-between w-full px-4 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black uppercase tracking-widest text-sm border border-slate-200 dark:border-slate-700">
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

      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <BackToTop />
      <AIChatWidget />

      {/* Enhanced Footer with Gold Glow and Deep Gradient */}
      <footer className="bg-gradient-to-t from-black via-slate-950 to-slate-900 dark:from-black dark:via-black dark:to-slate-950 text-slate-400 py-20 border-t-4 border-brandGold relative shadow-[0_-20px_60px_-15px_rgba(234,179,8,0.15)] overflow-hidden">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#EAB207_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <span className="text-4xl font-black text-white tracking-tighter uppercase leading-none block mb-6">
                Hulbert <span className="text-brandGold">&</span> Sons
              </span>
              <p className="mb-8 max-w-sm text-lg leading-relaxed font-medium text-slate-300">
                Restoring the functionality of your home with quality work, honest pricing, and family values since day one. Now proudly serving both the New Orleans and Greater Houston areas.
              </p>
              <div className="flex space-x-5">
                <a 
                  href="https://www.facebook.com/HulbertSons" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-slate-800 dark:bg-slate-900 border border-slate-700 dark:border-slate-800 flex items-center justify-center hover:bg-brandGold hover:text-slate-900 transition-all cursor-pointer transform hover:scale-110 shadow-lg"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-b border-white/10 pb-2">Quick Links</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-wider">
                <li><button onClick={() => navigateTo('home')} className="hover:text-brandGold transition-colors text-left hover:translate-x-2 transform duration-300 block">Home</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-brandGold transition-colors text-left hover:translate-x-2 transform duration-300 block">NOLA Services</button></li>
                <li>
                  <button 
                    onClick={() => currentPage === 'houston' ? navigateTo('home') : navigateTo('houston')} 
                    className={`${currentPage === 'houston' ? 'text-brandGold' : 'text-brandGold'} hover:text-white transition-colors text-left hover:translate-x-2 transform duration-300 block`}
                  >
                    {currentPage === 'houston' ? 'New Orleans LA Branch' : 'Houston TX Branch'}
                  </button>
                </li>
                <li><button onClick={() => navigateTo('home', 'contact')} className="hover:text-brandGold transition-colors text-left hover:translate-x-2 transform duration-300 block">Get Estimate</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm border-b border-white/10 pb-2">Our Leadership</h4>
              <ul className="space-y-6 text-sm">
                <li className="flex flex-col group bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-brandGold/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-white text-base tracking-tight italic">James Hulbert Sr.</span>
                    <a href="https://www.facebook.com/james.hulbert.780119" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brandGold transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brandGold mb-3">Founder • New Orleans HQ</p>
                  <a href="tel:5044527895" className="flex items-center text-slate-300 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 mr-2 text-brandGold" />
                    (504) 452-7895
                  </a>
                </li>

                <li className="flex flex-col group bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-brandGold/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-white text-base tracking-tight italic">James Hulbert III</span>
                    <a href="https://www.facebook.com/james.hulbert.334" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brandGold transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brandGold mb-3">Co-Founder • Houston Branch</p>
                  <a href="tel:2815777533" className="flex items-center text-slate-300 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 mr-2 text-brandGold" />
                    (281) 577-7533
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest uppercase font-black text-slate-500">
            <p>&copy; {new Date().getFullYear()} Hulbert & Sons. Built with Integrity. Serving LA & TX.</p>
            <p className="mt-4 md:mt-0 text-brandGold/40 hover:text-brandGold transition-colors cursor-default">Professional Handyman Services</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;