import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, User, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Casper H., your Hulbert & Sons virtual assistant. How can I help you with your home project today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are Casper H., the friendly and professional AI assistant for Hulbert & Sons Home Services. 
          We are a family-owned handyman and renovation business. 
          Branches: 
          - New Orleans (HQ): (504) 452-7895
          - Houston, TX: (281) 577-7533
          Services: Interior mastery (bathrooms, plumbing, flooring, water heaters) and Exterior protection (fences, concrete, roofing).
          Tone: Helpful, honest, family-oriented, and expert.
          Goal: Answer questions about home repair, explain our services, and guide users to contact us or use our AI project estimator form on the site.
          Keep responses concise and helpful. Always identify yourself as Casper H. if asked.`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Please try again or call us directly!";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a little trouble connecting right now. Please feel free to call our NOLA office at (504) 452-7895 or our Houston branch at (281) 577-7533!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-brandGold/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300 transition-colors duration-500">
          {/* Header */}
          <div className="bg-slate-900 dark:bg-black p-4 flex items-center justify-between border-b border-brandGold/30">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-brandGold rounded-full flex items-center justify-center mr-3 shadow-lg">
                <ShieldCheck className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <h3 className="text-white font-black text-sm uppercase tracking-wider">Casper H.</h3>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Online & Ready</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-300 ${
                  m.role === 'user' 
                    ? 'bg-brandGold text-slate-900 font-bold rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center transition-colors">
                  <Loader2 className="w-4 h-4 text-brandGold animate-spin mr-2" />
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Assistant is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 transition-colors">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a project..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brandGold rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all dark:text-white dark:placeholder:text-slate-500"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-slate-900 dark:bg-slate-800 text-brandGold p-3 rounded-xl hover:bg-brandGold hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:text-brandGold transition-all shadow-md active:scale-95 border border-transparent dark:border-slate-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-slate-900 dark:bg-slate-800 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 dark:hover:bg-slate-700 transition-all hover:scale-110 border-2 border-brandGold flex items-center justify-center group ${!isOpen ? 'animate-bounce-slow' : ''}`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-brandGold" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-7 h-7 text-brandGold" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;