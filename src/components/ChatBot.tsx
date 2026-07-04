import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles, User, HelpCircle, ArrowRight } from 'lucide-react';

const QUICK_QUESTIONS = [
  { text: "Bạn là ai?", label: "Giới thiệu bản thân" },
  { text: "Kỹ năng của Lâm Tài Chánh là gì?", label: "Kỹ năng cốt lõi" },
  { text: "Dự án nổi bật nhất?", label: "Dự án tiêu biểu" },
  { text: "GPA hiện tại là bao nhiêu?", label: "Học tập & GPA" },
  { text: "Cách liên hệ nhanh nhất?", label: "Thông tin liên lạc" }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Xin chào! Tôi là Trợ lý AI của anh Lâm Tài Chánh. Bạn có câu hỏi nào về kỹ năng tự động hóa (AI Automation), n8n, hay các dự án của anh Chánh không? Tôi rất sẵn lòng giải đáp!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Map history for API
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend, history })
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages(prev => [...prev, {
          id: Math.random().toString(),
          role: 'model',
          text: data.reply,
          timestamp: new Date()
        }]);
      } else {
        throw new Error(data.error || "Gặp lỗi khi xử lý tin nhắn");
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: 'model',
        text: '⚠️ Không thể kết nối với AI Assistant. Vui lòng đảm bảo rằng khóa bí mật GEMINI_API_KEY đã được thiết lập chính xác trong cấu hình Secrets của AI Studio, hoặc thử lại sau.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="ai-assistant-chatbot">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-linear-to-r from-brand-primary to-brand-secondary text-brand-surface-container-lowest flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300 relative glow-secondary"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X className="w-6 h-6 text-brand-surface" key="close" />
          ) : (
            <div className="relative" key="bot">
              <Bot className="w-6 h-6 text-brand-surface" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[550px] rounded-2xl glass-card flex flex-col overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Header */}
            <div className="p-4 bg-brand-surface-container-high border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-linear-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-brand-surface" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white flex items-center gap-1">
                    AI Assistant <Sparkles className="w-3.5 h-3.5 text-brand-secondary animate-pulse" />
                  </h3>
                  <p className="text-[10px] text-brand-secondary">Đại diện cho Lâm Tài Chánh</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-on-surface-variant hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user'
                        ? 'bg-brand-surface-container-highest text-brand-secondary'
                        : 'bg-brand-surface-container-high text-brand-primary'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-linear-to-r from-brand-primary/20 to-brand-secondary/20 text-white rounded-tr-none border border-brand-primary/20'
                        : 'bg-brand-surface-container-high text-brand-on-surface rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 max-w-[80%] mr-auto">
                  <div className="w-7 h-7 rounded-full bg-brand-surface-container-high text-brand-primary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-brand-surface-container-high p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className="p-3 bg-brand-surface-container-lowest/50 border-t border-white/5">
                <p className="text-[10px] text-brand-on-surface-variant mb-2 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-brand-secondary" /> Gợi ý câu hỏi:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.text)}
                      className="text-[10px] bg-brand-surface-container hover:bg-brand-surface-container-high border border-white/10 text-brand-on-surface-variant hover:text-brand-secondary py-1 px-2 rounded-full cursor-pointer transition-colors duration-200"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 bg-brand-surface-container-high border-t border-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Hỏi trợ lý AI điều gì đó..."
                className="flex-1 bg-brand-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-brand-secondary outline-hidden"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-linear-to-r from-brand-primary to-brand-secondary text-brand-surface flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
