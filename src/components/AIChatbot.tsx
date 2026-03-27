import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const domainSuggestions: Record<string, string[]> = {
  "help": ["Healthcare", "Community Development", "Poverty Alleviation"],
  "people": ["Healthcare", "Community Development", "Counseling"],
  "teach": ["Education", "Child Welfare", "Mentoring"],
  "code": ["Education", "Technology", "Digital Literacy"],
  "nature": ["Environment", "Animal Welfare", "Conservation"],
  "environment": ["Environment", "Animal Welfare", "Conservation"],
  "animal": ["Animal Welfare", "Environment"],
  "child": ["Child Welfare", "Education", "Arts & Culture"],
  "women": ["Women Empowerment", "Community Development"],
  "health": ["Healthcare", "Poverty Alleviation"],
  "art": ["Arts & Culture", "Child Welfare", "Education"],
  "music": ["Arts & Culture", "Community Development"],
  "cook": ["Poverty Alleviation", "Community Development"],
  "disaster": ["Disaster Relief", "Community Development"],
  "legal": ["Legal Aid", "Women Empowerment"],
  "photo": ["Arts & Culture", "Environment"],
  "write": ["Education", "Arts & Culture"],
  "design": ["Arts & Culture", "Education", "Technology"],
  "market": ["Community Development", "Women Empowerment"],
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hello! 👋 I'm the Soul Bridge AI Assistant. I can help you find the perfect volunteering domain based on your interests. Tell me what you enjoy doing!";
  }

  if (lower.includes("how") && (lower.includes("start") || lower.includes("begin") || lower.includes("join"))) {
    return "Getting started is easy! 🚀\n\n1. **Sign up** as a Volunteer\n2. **Complete your profile** with skills & interests\n3. **Browse events** that match your profile\n4. **Apply** to events you love\n5. **Track your impact** on your dashboard\n\nWant me to suggest some domains based on your interests?";
  }

  if (lower.includes("badge") || lower.includes("achievement")) {
    return "🏆 **Badge System:**\n\n- 👣 **First Step** — Complete your first event\n- 🤝 **Helping Hand** — 50 hours volunteered\n- 🌟 **Changemaker** — 100 hours volunteered\n- 🦸 **Community Hero** — 150 hours\n- 🏆 **Legend** — 200+ hours\n- 🎯 **Multi-Domain** — Volunteer in 5+ domains\n\nKeep volunteering to earn them all!";
  }

  if (lower.includes("leaderboard")) {
    return "📊 Our leaderboard ranks volunteers by hours contributed each month. Top 3 get featured on the homepage with special badges! Keep volunteering to climb the ranks. 🏅";
  }

  const matchedDomains: string[] = [];
  for (const [key, domains] of Object.entries(domainSuggestions)) {
    if (lower.includes(key)) {
      domains.forEach((d) => { if (!matchedDomains.includes(d)) matchedDomains.push(d); });
    }
  }

  if (matchedDomains.length > 0) {
    return `Based on your interests, I'd recommend these volunteering domains:\n\n${matchedDomains.map((d) => `✨ **${d}**`).join("\n")}\n\nYou can explore events in these areas on our **Events** page. Would you like to know more about any specific domain?`;
  }

  if (lower.includes("thank")) {
    return "You're welcome! 😊 Feel free to ask me anything else about volunteering. Together we can make a difference! 💪";
  }

  return "I can help you find your perfect volunteering match! 🎯\n\nTry telling me:\n- What you enjoy doing (e.g., 'I like teaching kids')\n- Your skills (e.g., 'I know coding')\n- What causes matter to you (e.g., 'I care about the environment')\n\nOr ask about badges, leaderboard, or how to get started!";
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "bot", content: "Hi! 👋 I'm your Soul Bridge AI Assistant. Tell me your interests and I'll suggest the best volunteering domains for you!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const botMsg: Message = { id: `b-${Date.now()}`, role: "bot", content: getResponse(userMsg.content) };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl transition-all flex items-center justify-center animate-pulse-glow"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl shadow-2xl border bg-card overflow-hidden" style={{ animation: "fade-in-up 0.3s ease-out" }}>
          {/* Header */}
          <div className="gradient-hero p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-heading font-bold text-primary-foreground text-sm">AI Assistant</p>
              <p className="text-xs text-primary-foreground/80">Powered by Soul Bridge</p>
            </div>
            <Sparkles className="w-5 h-5 text-primary-foreground/60 ml-auto" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.role === "bot" ? "bg-primary/10" : "bg-secondary/10"}`}>
                  {m.role === "bot" ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-secondary" />}
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm"
                }`}>
                  {m.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-1" : ""}>
                      {line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j}>{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-xl border bg-background text-sm"
              />
              <button onClick={send} className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
