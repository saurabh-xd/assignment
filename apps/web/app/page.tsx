"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const loadConversation = async (id: string) => {
  const res = await fetch(`http://localhost:3001/api/chat/conversations/${id}`);
  const data = await res.json();

  setMessages(data);
};

  const sendMessage = async () => {
    if (!message) return;

    setLoading(true);

    const res = await fetch("http://localhost:3001/api/chat/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: message },
      { role: "assistant", content: data.reply },
    ]);

    if (!conversationId) {
      setConversationId(data.conversationId);
       loadConversation(data.conversationId);
    }

    setMessage("");
    setLoading(false);
  };

  

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>AI Support Chat</h2>

      <div style={{ border: "1px solid #ddd", padding: 20, minHeight: 300 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}

        {loading && <p>Agent is typing...</p>}
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: 10 }}
          placeholder="Ask something..."
        />

        <button onClick={sendMessage} style={{ padding: 10 }}>
          Send
        </button>
      </div>
    </div>
  );
}
