import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";

export default function Chat({ project, onBack }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [editingPrompt, setEditingPrompt] = useState(false);
  const bottomRef = useRef(null);

  // Load chat + prompt
  useEffect(() => {
    const loadData = async () => {
      const chatRes = await api.get(`/chat/${project.id}`);
      setMessages(chatRes.data);

      const promptRes = await api.get(`/projects/${project.id}/prompt`);
      setSystemPrompt(promptRes.data.systemPrompt);
    };
    loadData();
  }, [project.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const savePrompt = async () => {
    await api.put(`/projects/${project.id}/prompt`, { systemPrompt });
    setEditingPrompt(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const res = await fetch(
      `https://chatbot-backend-0g5l.onrender.com/chat/${project.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: userMessage.content }),
      },
    );

    setInput("");
    setLoading(true);

    let text = "";
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      text += decoder.decode(value);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: text,
        };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow flex gap-4">
        <button onClick={onBack} className="text-blue-600">
          ← Back
        </button>
        <h2 className="font-semibold">{project.name}</h2>
      </div>

      {/* System Prompt */}
      <div className="bg-yellow-50 p-4 border-b">
        <div className="flex justify-between">
          <strong>System Prompt</strong>
          <button
            onClick={() => setEditingPrompt(!editingPrompt)}
            className="text-blue-600 text-sm">
            {editingPrompt ? "Cancel" : "Edit"}
          </button>
        </div>

        {editingPrompt ? (
          <>
            <textarea
              className="w-full mt-2 p-2 border rounded"
              rows={3}
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
            <button
              onClick={savePrompt}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
              Save
            </button>
          </>
        ) : (
          <p className="text-sm mt-2">{systemPrompt}</p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xl p-3 rounded ${
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-white shadow"
            }`}>
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
