import React, { useState } from "react";
import { Sparkles, Loader2, Phone } from "lucide-react";

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
  const [projectDetails, setProjectDetails] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<AiSuggestion | null>(null);

  const handleAnalyzeProject = async () => {
    if (!projectDetails.trim()) return;

    setIsAnalyzing(true);
    setAiSuggestion(null);

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details: projectDetails }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);

      setAiSuggestion(data as AiSuggestion);
    } catch (e) {
      console.error(e);
      alert("AI estimate failed. Open DevTools → Console.");
    } finally {
      setIsAnalyzing(false);
    }
  };

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

  const applySuggestion = () => {
    if (aiSuggestion) {
      setProjectDetails(aiSuggestion.improved_description);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-yellow-50/50 rounded-2xl shadow-2xl p-8 border border-brandGold/20 hover:shadow-brandGold/10 transition-shadow duration-500">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-brandGold focus:bg-white focus:ring-0 transition-colors outline-none shadow-sm" placeholder="John" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-brandGold focus:bg-white focus:ring-0 transition-colors outline-none shadow-sm" placeholder="Doe" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input type="tel" className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-brandGold focus:bg-white focus:ring-0 transition-colors outline-none shadow-sm" placeholder="(504) 000-0000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-brandGold focus:bg-white focus:ring-0 transition-colors outline-none shadow-sm" placeholder="john@example.com" />
          </div>
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Project Details</label>
            {!aiSuggestion && (
              <button 
                type="button" 
                onClick={handleAnalyzeProject}
                disabled={isAnalyzing || projectDetails.length < 5}
                className="text-xs flex items-center text-brandGold hover:text-white font-bold bg-brandGold/10 hover:bg-brandGold border border-brandGold/30 px-3 py-1.5 rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3 mr-1" />
                )}
                {isAnalyzing ? 'Analyzing...' : '✨ AI Analyze & Estimate'}
              </button>
            )}
          </div>
          <textarea 
            rows={4} 
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-brandGold focus:bg-white focus:ring-0 transition-colors outline-none resize-none shadow-sm" 
            placeholder="Tell us what needs fixing... (e.g. 'Leaky faucet in the master bath')"
          ></textarea>
        </div>

        {aiSuggestion && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-brandGold/30 rounded-xl p-5 shadow-sm">
            {aiSuggestion.urgency === 'High' && (
              <div className="bg-red-100 border border-red-200 text-red-800 p-3 rounded-lg mb-4 flex items-start">
                <div className="bg-red-200 p-1 rounded-full mr-2">
                  <Phone className="w-4 h-4 text-red-700" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider">High Urgency Detected</p>
                  <p className="text-sm font-medium">{aiSuggestion.urgency_message || "Please call us immediately for emergency service."}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-brandGold mr-2 flex-shrink-0" />
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">AI Analysis</h4>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black bg-brandGold/20 text-slate-900 border border-brandGold/40 shadow-sm">
                  EST: {aiSuggestion.estimated_cost}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-bold text-brandGold uppercase tracking-widest mb-1 italic">Improved Description</p>
              <p className="text-sm text-slate-700 bg-white/80 p-3 rounded-lg border border-brandGold/20 italic">
                "{aiSuggestion.improved_description}"
              </p>
            </div>
            
            <div className="flex gap-2 pt-2 border-t border-brandGold/20">
              <button 
                type="button" 
                onClick={applySuggestion}
                className="bg-brandGold hover:bg-slate-900 text-slate-900 hover:text-white text-xs font-black uppercase tracking-wider py-2 px-4 rounded-lg transition-all shadow-sm"
              >
                Apply Details
              </button>
              <button 
                type="button" 
                onClick={() => setAiSuggestion(null)}
                className="text-slate-600 hover:text-slate-900 text-xs font-bold py-2 px-4"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <button type="button" className="w-full bg-brandGold hover:bg-slate-900 text-slate-900 hover:text-white font-black uppercase tracking-widest py-4 rounded-lg shadow-md transition-all transform hover:-translate-y-1 active:scale-95">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
