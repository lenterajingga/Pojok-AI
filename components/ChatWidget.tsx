
import React, { useState, useEffect, useRef } from 'react';
import { Message, Role, ChatConfig } from '../types';
import ChatMessage from './ChatMessage';
import { sendMessageToGemini } from '../services/geminiService';

const DEFAULT_CONFIG: ChatConfig = {
  assistantName: 'AI Blogger',
  welcomeMessage: 'Halo! Saya asisten AI untuk blog ini. Ada yang bisa saya bantu?',
  systemInstruction: 'Anda adalah asisten blog yang ramah. Jawab pertanyaan pembaca dengan sopan, ringkas, dan membantu. Gunakan Bahasa Indonesia.'
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('blogger_chat_history');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Failed to parse history", e);
        initializeWelcome();
      }
    } else {
      initializeWelcome();
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('blogger_chat_history', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages]);

  const initializeWelcome = () => {
    const welcome: Message = {
      id: 'welcome',
      role: Role.MODEL,
      text: DEFAULT_CONFIG.welcomeMessage,
      timestamp: Date.now(),
    };
    setMessages([welcome]);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(messages, input, DEFAULT_CONFIG.systemInstruction);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: Role.MODEL,
        text: response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('blogger_chat_history');
    initializeWelcome();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">{DEFAULT_CONFIG.assistantName}</h3>
                <span className="text-[10px] opacity-80 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online & Siap Membantu
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={clearChat}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80"
                title="Hapus Percakapan"
              >
                <i className="fas fa-trash-alt text-xs"></i>
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 bg-slate-50/50 chat-scroll"
          >
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} assistantName={DEFAULT_CONFIG.assistantName} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="w-full pl-4 pr-12 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`absolute right-2 p-1.5 rounded-lg transition-all ${
                  input.trim() && !isLoading 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </form>
            <p className="text-[10px] text-center mt-2 text-slate-400">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-white text-indigo-600 rotate-90' : 'bg-indigo-600 text-white'
        }`}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-xl`}></i>
      </button>
    </div>
  );
};

export default ChatWidget;
