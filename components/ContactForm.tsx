import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Loader2, Phone, Image as ImageIcon, Upload, X, CheckCircle2, Clock } from 'lucide-react';

interface AiSuggestion {
  improved_description: string;
  questions: string[];
  category: string;
  estimated_cost: string;
  estimated_time: string;
  difficulty: string;
  urgency: string;
  urgency_message: string;
  safety_tip: string;
  prep_tip: string;
}

const ContactForm: React.FC = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AiSuggestion | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyzeProject = async () => {
    if (!projectDetails.trim()) return;
    
    setIsAnalyzing(true);
    setAiSuggestion(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const parts: any[] = [
        { text: `You are an expert handyman estimator for "Hulbert & Sons" in New Orleans.
Context:
- Service Areas: Greater New Orleans and Houston, TX.
- Pricing: Use 2025 market rates for professional labor and materials.

A client has written this project description: "${projectDetails}". ${selectedImage ? "They have also provided a photo of the issue." : ""} Analyze this request and provide a detailed estimate and professional advice.` }
      ];

      if (selectedImage) {
        const base64Data = selectedImage.split(',')[1];
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Data
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    improved_description: { type: Type.STRING },
                    questions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    category: { type: Type.STRING },
                    estimated_cost: { type: Type.STRING },
                    estimated_time: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                    urgency: { type: Type.STRING },
                    urgency_message: { type: Type.STRING },
                    safety_tip: { type: Type.STRING },
                    prep_tip: { type: Type.STRING },
                },
                required: ["improved_description", "estimated_cost", "urgency"]
            }
        }
      });

      const textResponse = response.text;
      if (textResponse) {
          const result = JSON.parse(textResponse) as AiSuggestion;
          setAiSuggestion(result);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend or hello@hulbertsons.com
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const applySuggestion = () => {
    if (aiSuggestion) {
      setProjectDetails(aiSuggestion.improved_description);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center shadow-2xl border border-brandGold/20 animate-in fade-in zoom-in-95 transition-colors duration-500">
        <div className="w-20 h-20 bg-brandGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-brandGold" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase italic transition-colors">Request Sent!</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium transition-colors">
          Thanks for reaching out. A specialist will review your project (and photo) and get back to you with a formal estimate at <strong>hello@hulbertsons.com</strong> within 24 hours.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-brandGold font-black uppercase tracking-widest text-sm hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-300/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-slate-800 hover:shadow-brandGold/5 transition-all duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="bg-slate-900/10 dark:bg-brandGold/10 px-4 py-2 rounded-xl flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-900 dark:text-brandGold" />
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-brandGold">Est. turnaround: &lt;24 Hours</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">hello@hulbertsons.com</div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest transition-colors">First Name</label>
            <input 
              required
              type="text" 
              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brandGold focus:ring-4 focus:ring-brandGold/10 transition-all outline-none shadow-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-600" 
              placeholder="John" 
            />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest transition-colors">Last Name</label>
            <input 
              required
              type="text" 
              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brandGold focus:ring-4 focus:ring-brandGold/10 transition-all outline-none shadow-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-600" 
              placeholder="Doe" 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest transition-colors">Phone Number</label>
            <input 
              required
              type="tel" 
              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brandGold focus:ring-4 focus:ring-brandGold/10 transition-all outline-none shadow-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-600" 
              placeholder="(504) 000-0000" 
            />
          </div>
          <div>
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-widest transition-colors">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brandGold focus:ring-4 focus:ring-brandGold/10 transition-all outline-none shadow-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-600" 
              placeholder="john@example.com" 
            />
          </div>
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-end mb-2">
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest transition-colors">Project Details</label>
            {!aiSuggestion && (
              <button 
                type="button" 
                onClick={handleAnalyzeProject}
                disabled={isAnalyzing || projectDetails.length < 5}
                className="text-[10px] md:text-xs flex items-center bg-brandGold text-slate-900 font-black px-4 py-2 rounded-full transition-all hover:bg-slate-900 hover:text-brandGold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl uppercase tracking-widest"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 mr-2" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'AI Analyze & Estimate'}
              </button>
            )}
          </div>
          <textarea 
            rows={4} 
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-brandGold focus:ring-4 focus:ring-brandGold/10 transition-all outline-none resize-none shadow-sm text-slate-900 dark:text-white font-medium placeholder:text-slate-300 dark:placeholder:text-slate-600" 
            placeholder="Tell us what needs fixing... (e.g. 'Leaky faucet in the master bath')"
          ></textarea>
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest transition-colors">Attach Photo (Optional)</label>
          <div 
            onClick={() => !selectedImage && fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl transition-all flex flex-col items-center justify-center p-6 cursor-pointer group
              ${selectedImage ? 'border-brandGold bg-white dark:bg-slate-800' : 'border-slate-300 dark:border-slate-700 hover:border-brandGold bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            {selectedImage ? (
              <div className="relative w-full">
                <img src={selectedImage} alt="Preview" className="w-full h-40 object-cover rounded-xl" />
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  className="absolute -top-2 -right-2 bg-slate-900 text-white p-1.5 rounded-full shadow-xl hover:bg-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-3 flex items-center justify-center gap-2 text-brandGold font-black uppercase text-[10px] tracking-widest">
                  <CheckCircle2 className="w-3 h-3" /> Photo attached for 24h review
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-slate-900/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-brandGold transition-colors" />
                </div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-brandGold transition-colors">
                  Upload Project Photo
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Faster estimates with visual context</p>
              </>
            )}
          </div>
        </div>

        {aiSuggestion && (
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-2 border-brandGold rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
            {aiSuggestion.urgency === 'High' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-800 dark:text-red-400 p-4 rounded-xl mb-6 flex items-start transition-colors">
                <div className="bg-red-500 p-1.5 rounded-full mr-3 mt-0.5">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-black text-xs uppercase tracking-[0.2em] text-red-600 dark:text-red-500 mb-1">High Urgency Detected</p>
                  <p className="text-sm font-bold">{aiSuggestion.urgency_message || "Please call us immediately for emergency service."}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="bg-brandGold p-1.5 rounded-lg mr-3">
                  <Sparkles className="w-5 h-5 text-slate-900" />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest italic transition-colors">AI Insights</h4>
              </div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black bg-brandGold text-slate-900 shadow-lg uppercase tracking-widest">
                EST: {aiSuggestion.estimated_cost}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-[10px] font-black text-brandGold uppercase tracking-[0.2em] mb-2 italic">Improved Description</p>
              <p className="text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 italic font-medium leading-relaxed transition-colors">
                "{aiSuggestion.improved_description}"
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={applySuggestion}
                className="flex-1 bg-brandGold hover:bg-slate-900 text-slate-900 hover:text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg active:scale-95 dark:hover:bg-black"
              >
                Use This Suggestion
              </button>
              <button 
                type="button" 
                onClick={() => setAiSuggestion(null)}
                className="px-6 py-3.5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        
        <div className="space-y-4 pt-4">
          <button 
            type="submit" 
            className="w-full bg-brandGold hover:bg-slate-900 text-slate-900 hover:text-white font-black uppercase tracking-[0.25em] py-5 rounded-xl shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-lg flex items-center justify-center gap-3 dark:hover:bg-black"
          >
            Submit Request
          </button>
          <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 opacity-60">
            <Clock className="w-3 h-3" /> Guaranteed Response &lt; 24h
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;