import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={toggleTheme}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 dark:bg-brandGold shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 border-2 border-brandGold dark:border-slate-900"
        aria-label="Toggle Dark Mode"
      >
        <div className="relative h-6 w-6">
          <Sun className={`absolute inset-0 h-6 w-6 text-slate-900 transition-all duration-500 transform ${isDarkMode ? 'scale-100 rotate-0' : 'scale-0 -rotate-90 opacity-0'}`} />
          <Moon className={`absolute inset-0 h-6 w-6 text-brandGold transition-all duration-500 transform ${isDarkMode ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0'}`} />
        </div>
        
        {/* Tooltip */}
        <span className="absolute left-full ml-4 whitespace-nowrap rounded-lg bg-slate-900 dark:bg-brandGold px-3 py-1.5 text-xs font-black uppercase tracking-widest text-brandGold dark:text-slate-900 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow-xl border border-brandGold/20">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;