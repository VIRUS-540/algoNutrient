"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function NutrientChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hello! I've loaded your biological profile, genotype, and fitness goals. Ask me for meal swaps, macro feedback, or health recommendations.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", text: userText },
    ];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const savedProfile = localStorage.getItem("algoNutrientUser");
      const userProfile = savedProfile ? JSON.parse(savedProfile) : {};

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(1), // Exclude initial greeting
          userProfile,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "Our AI advisor is experiencing high traffic right now. Please tap send again in a moment.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Network error. Please check your connection and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[480px] w-[350px] flex-col overflow-hidden rounded-3xl border border-[#A8B99A]/50 bg-white shadow-2xl shadow-[#244B38]/15 sm:w-[390px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#244B38] px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#C69A55] text-xs font-bold text-[#244B38]">
                AI
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#F3EEDF]">
                  algoNutrient Advisor
                </h3>
                <p className="text-[11px] text-[#A8B99A]">
                  Synced to your health profile
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-[#A8B99A] transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#F3EEDF]/45 p-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-[#244B38] text-white"
                      : "rounded-bl-sm border border-[#A8B99A]/35 bg-white text-[#244B38] shadow-2xs"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-[#A8B99A]/35 bg-white px-4 py-2.5 text-xs font-medium text-[#52765A]">
                  Analyzing your biomarkers...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-[#A8B99A]/30 bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about meals, macros, or workouts..."
              className="flex-1 rounded-full border border-[#A8B99A]/50 bg-[#F3EEDF]/50 px-4 py-2 text-sm text-[#244B38] placeholder-[#52765A]/70 outline-none focus:border-[#244B38] focus:bg-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#244B38] text-sm font-bold text-white transition-colors hover:bg-[#52765A] disabled:opacity-40 cursor-pointer"
            >
              ↑
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="ml-auto flex items-center gap-2.5 rounded-full bg-[#244B38] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#244B38]/25 transition-transform hover:scale-[1.02] hover:bg-[#52765A] cursor-pointer"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#C69A55]" />
        {isOpen ? "Close Advisor" : "Ask Nutrient AI"}
      </button>
    </div>
  );
}