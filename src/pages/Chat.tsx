import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { mockChatConversations } from "@/lib/store";
import Navbar from "@/components/Navbar";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState(mockChatConversations);
  const endRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedChat);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [selected?.messages]);

  const sendMessage = () => {
    if (!input.trim() || !selectedChat) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedChat
          ? { ...c, messages: [...c.messages, { id: `m-${Date.now()}`, sender: "user", text: input.trim(), time: "Just now" }], lastMessage: input.trim(), time: "Just now" }
          : c
      )
    );
    setInput("");
    // Mock reply
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedChat
            ? { ...c, messages: [...c.messages, { id: `m-${Date.now()}`, sender: "ngo", text: "Thanks for your message! We'll get back to you soon. 😊", time: "Just now" }] }
            : c
        )
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 h-screen flex">
        {/* Sidebar */}
        <div className={`w-full sm:w-80 border-r bg-card flex flex-col ${selectedChat ? "hidden sm:flex" : "flex"}`}>
          <div className="p-4 border-b">
            <h2 className="font-heading font-bold text-lg">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedChat(c.id)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left ${
                  selectedChat === c.id ? "bg-primary/5" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl shrink-0">
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">{c.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!selectedChat ? "hidden sm:flex" : "flex"}`}>
          {selected ? (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center gap-3 bg-card">
                <button onClick={() => setSelectedChat(null)} className="sm:hidden p-1">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                  {selected.avatar}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{selected.name}</p>
                  <p className="text-xs text-success">Online</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><Phone className="w-4 h-4 text-muted-foreground" /></button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><Video className="w-4 h-4 text-muted-foreground" /></button>
                  <button className="p-2 rounded-xl hover:bg-muted transition-colors"><MoreVertical className="w-4 h-4 text-muted-foreground" /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
                {selected.messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                      m.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-card border rounded-bl-sm"
                    }`}>
                      <p>{m.text}</p>
                      <p className={`text-[10px] mt-1 ${m.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-card">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-xl border bg-background text-sm"
                  />
                  <button onClick={sendMessage} className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 text-3xl">💬</div>
                <p className="font-heading font-bold">Select a conversation</p>
                <p className="text-sm text-muted-foreground">Choose from the sidebar to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
