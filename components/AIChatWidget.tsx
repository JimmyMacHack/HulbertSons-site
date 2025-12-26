import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";

type ChatMsg = { role: "user" | "model"; text: string };

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "model",
      text: "Hi — I’m the Hulbert & Sons assistant. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  async function askAssistant(question: string): Promise<string> {
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return (data.answer || "").toString();
  }

  async function handleSend() {
    const q = input.trim();
    if (!q || isLoading) return;

    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: q }]);

    try {
      const answer = await askAssistant(q);
      setMessages((prev) => [...prev, { role: "model", text: answer || "No answer returned." }]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: `Error: ${String(e?.message || e)}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating button — KEEPING your icon behavior */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-lg"
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[90vw] bg-white rounded-xl shadow-2xl border overflow-hidden">
          <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="font-semibold">Hulbert &amp; Sons Assistant</div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-[360px] overflow-y-auto px-3 py-3 space-y-2 bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-auto bg-slate-900 text-white"
                    : "mr-auto bg-white border"
                }`}
              >
                {m.text}
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto bg-white border rounded-lg px-3 py-2 text-sm">
                Thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t bg-white flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask about services, pricing, availability…"
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-slate-900 text-white rounded-lg px-3 py-2 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;