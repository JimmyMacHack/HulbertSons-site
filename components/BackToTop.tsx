import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-24 right-6 z-50 transition-all duration-300 transform ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      <button
        onClick={scrollToTop}
        className="bg-slate-900 text-brandGold p-3.5 rounded-full shadow-2xl border-2 border-brandGold/30 hover:bg-brandGold hover:text-slate-900 hover:border-white transition-all hover:scale-110 active:scale-95 group"
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default BackToTop;