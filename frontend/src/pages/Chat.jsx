import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Chat({ project, onBack }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Load chat history
  useEffect(() => {
    const loadHistory = async () => {
      const res = await api.get(`/chat/${project.id}`);
      setMessages(res.data);
    };
    loadHistory();
  }, [project.id]);

  // 🔹 Send message + stream response
  const sendMessage = async () => {
    if (!input.trim()) return;

    const content = input; // ✅ FIX: store input before clearing
    setInput("");

    // Add user message to UI
    setMessages((prev) => [...prev, { role: "user", content }]);

    setLoading(true);

    const res = await fetch(
      `https://chatbot-backend-0g5l.onrender.com/chat/${project.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: content }), // ✅ FIX
      },
    );

    let assistantText = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      assistantText += chunk;

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];

        if (last?.role === "assistant") {
          last.content = assistantText;
        } else {
          updated.push({
            role: "assistant",
            content: assistantText,
          });
        }

        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow flex items-center gap-4">
        <button onClick={onBack} className="text-blue-600">
          ← Back
        </button>
        <h2 className="font-semibold">{project.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xl p-3 rounded ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-white shadow"
            }`}>
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="mr-auto bg-white p-3 rounded shadow text-gray-400">
            AI is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
}
