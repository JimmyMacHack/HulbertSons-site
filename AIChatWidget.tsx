import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-all hover:scale-110 border-2 border-[#EAB207] animate-bounce-slow"
      aria-label="Toggle chat"
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
    </button>
  );
};

export default AIChatWidget;