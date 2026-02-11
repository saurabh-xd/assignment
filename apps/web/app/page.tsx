"use client";

import { useState, useRef, useEffect } from "react";
import { client } from "../lib/rpc";
import { Send, Bot, User, Loader2 } from "lucide-react";


interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you with our services today?",
    },
  ]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const loadConversation = async (id: string) => {
    try {
     const res = await (client as any).api.chat.conversations[":id"].$get({
  param: { id },
});

const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to load conversation", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;
    setMessage(""); 
    setLoading(true);

    // Optimistically add user message
    setMessages((prev) => [...prev, { role: "user", content: currentMessage }]);

    try {
      const res = await (client as any).api.chat.messages.$post({
        json: { message: currentMessage, conversationId },
      });

      const data = await res.json();

    
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      if (!conversationId) {
        setConversationId(data.conversationId);
       
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans">
   
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[700px]">
        {/* Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">AI Support</h2>
            <p className="text-xs text-zinc-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-950/50">
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            return (
              <div
                key={i}
                className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[85%] gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar Icons */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isUser ? "bg-indigo-600" : "bg-zinc-700"
                    }`}
                  >
                    {isUser ?
                      <User size={16} className="text-white" />
                    : <Bot size={16} className="text-zinc-300" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`p-3 text-sm rounded-2xl ${
                      isUser ?
                        "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start w-full">
              <div className="flex items-center gap-2 bg-zinc-800 rounded-2xl rounded-tl-none border border-zinc-700 p-3 ml-10">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800">
          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-500 text-sm"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading ?
                <Loader2 size={16} className="animate-spin" />
              : <Send size={16} />}
            </button>
          </div>
          <p className="text-center text-xs text-zinc-600 mt-2">
            AI can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
