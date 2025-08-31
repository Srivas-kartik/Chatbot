import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

function Bot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    setLoading(true);
    if (!input.trim()) return;
    try {
      const res = await axios.post("https://chatbot-4-vpwd.onrender.com/bot/v1/message", {
        text: input,
      });
      if (res.status === 200) {
        setMessages([
          ...messages,
          { text: res.data.userMessage, sender: "user" },
          { text: res.data.botMessage, sender: "bot" },
        ]);
      }
      console.log(res.data);
    } catch (error) {
      console.log("Error sending message:", error);
    }
    setInput("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full border-b border-gray-800 bg-[#0d0d0d]/90 backdrop-blur-md z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-extrabold tracking-wide text-green-500">
            BotSpoof
          </h1>
          <FaUserCircle size={34} className="cursor-pointer text-gray-300" />
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto pt-24 pb-28 flex items-center justify-center">
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-lg animate-fadeIn">
              👋 Hi, I'm{" "}
              <span className="text-green-500 font-semibold">BotSpoof</span>.
              <p className="text-sm text-gray-500 mt-2">
                Ask me anything to get started!
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 rounded-2xl text-sm md:text-base shadow-md transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white self-end rounded-br-none"
                      : "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 self-start rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-gray-700/80 text-gray-300 px-4 py-2 rounded-xl max-w-[60%] self-start animate-pulse">
                  Bot is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 bg-[#0d0d0d]/95 backdrop-blur-lg z-10">
        <div className="max-w-3xl mx-auto flex justify-center px-4 py-3">
          <div className="w-full flex bg-gray-900 rounded-full px-4 py-2 shadow-xl">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-3 text-sm md:text-base"
              placeholder="Ask BotSpoof..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-full text-white font-medium transition-all duration-200 shadow-md"
            >
              <span className="hidden md:inline">Send</span>
              <FiSend className="text-lg" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bot;
