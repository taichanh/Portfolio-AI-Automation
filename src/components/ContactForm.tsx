import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Zap, Cpu, Mail, Trash2, ShieldAlert, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<number>(-1);
  const [simulatedReply, setSimulatedReply] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');

  // Load inquiries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('chanh_portfolio_inquiries');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  }, []);

  const saveInquiry = (newInquiry: Inquiry) => {
    try {
      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('chanh_portfolio_inquiries', JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  };

  const handleDeleteInquiry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = inquiries.filter(inq => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem('chanh_portfolio_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionStep(0); // Trigger received
    setSimulatedReply('');

    try {
      // Step 1: Simulated Wait for Trigger processing
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      setSubmissionStep(1); // AI analysis
      
      // Fetch AI analyzed smart reply
      const response = await fetch('/api/contact-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      
      const data = await response.json();
      const replyText = data.autoReply || `Cảm ơn ${name} đã liên hệ. Anh Chánh đã nhận được thông tin và sẽ phản hồi sớm nhất!`;

      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmissionStep(2); // Auto draft & Send

      await new Promise(resolve => setTimeout(resolve, 1200));
      setSubmissionStep(3); // Completed

      const newInq: Inquiry = {
        id: Math.random().toString(),
        name,
        email,
        message,
        timestamp: new Date().toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        autoReply: replyText
      };

      saveInquiry(newInq);
      setSimulatedReply(replyText);
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setSubmissionStep(-1);
      setIsSubmitting(false);
      alert("⚠️ Đã xảy ra lỗi khi kết nối hệ thống tự động hóa. Vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/10" id="contact-panel-wrapper">
      {/* Header controls for forms or history tracker */}
      <div className="flex justify-between items-center bg-brand-surface-container-high/60 px-6 py-4 border-b border-white/5">
        <h3 className="font-bold text-sm text-white font-display flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-secondary" /> Hộp thư trực tuyến của Chánh
        </h3>

        {inquiries.length > 0 && (
          <div className="flex gap-1 bg-brand-surface p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer ${
                activeTab === 'form' 
                  ? 'bg-brand-primary text-brand-surface shadow-xs' 
                  : 'text-brand-on-surface-variant hover:text-white'
              }`}
            >
              Gửi tin nhắn
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer relative ${
                activeTab === 'history' 
                  ? 'bg-brand-primary text-brand-surface shadow-xs' 
                  : 'text-brand-on-surface-variant hover:text-white'
              }`}
            >
              Lịch sử gửi ({inquiries.length})
            </button>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'form' ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {!isSubmitting && submissionStep !== 3 ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant mb-2 font-mono">Họ tên</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nguyễn Văn A" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-0 outline-hidden transition-all placeholder:text-white/20 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant mb-2 font-mono">Email</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-0 outline-hidden transition-all placeholder:text-white/20 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant mb-2 font-mono">Lời nhắn</label>
                    <textarea 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hãy viết lời nhắn hoặc cơ hội tuyển dụng tại đây..." 
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-primary focus:ring-0 outline-hidden transition-all placeholder:text-white/20 text-sm"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-brand-primary text-brand-surface font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-98 transition-all shadow-lg cursor-pointer glow-primary flex items-center justify-center gap-2 text-sm"
                  >
                    Gửi email cho tôi
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* n8n Automation simulation loading screen */
                <div className="py-8 text-center space-y-8">
                  {submissionStep < 3 ? (
                    <div className="space-y-4">
                      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-brand-primary/10 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-brand-secondary rounded-full animate-spin"></div>
                        <Cpu className="w-8 h-8 text-brand-secondary animate-pulse" />
                      </div>
                      <h4 className="text-base font-bold font-display text-white">n8n Engine đang xử lý sự kiện...</h4>
                      <p className="text-xs text-brand-on-surface-variant max-w-md mx-auto">
                        Hệ thống tự động hóa phản hồi thông minh đang được vận hành để xử lý và phân tích lời nhắn của bạn.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full mx-auto flex items-center justify-center">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-bold font-display text-emerald-400">Gửi Tin Nhắn Thành Công!</h4>
                      <p className="text-xs text-brand-on-surface-variant max-w-sm mx-auto">
                        Cảm ơn bạn đã gửi liên hệ. Quy trình tự động hóa đã gửi một email phản hồi nhanh đến bạn.
                      </p>
                    </div>
                  )}

                  {/* Flow Steps list */}
                  <div className="max-w-md mx-auto bg-brand-surface-container-lowest p-5 rounded-xl border border-white/5 space-y-4 text-left font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-brand-on-surface-variant font-bold text-[10px]">n8n Pipeline Execution</span>
                      <span className="text-[10px] text-brand-secondary">3.2s runtime</span>
                    </div>

                    {/* Step 1 */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-brand-on-surface">
                        <span className={`w-2 h-2 rounded-full ${submissionStep >= 0 ? 'bg-emerald-400 animate-ping' : 'bg-white/10'}`} />
                        1. Webhook trigger nhận form
                      </span>
                      <span className="text-brand-on-surface-variant">{submissionStep >= 0 ? 'SUCCESS' : 'PENDING'}</span>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-brand-on-surface">
                        <span className={`w-2 h-2 rounded-full ${submissionStep >= 1 ? 'bg-emerald-400 animate-ping' : 'bg-white/10'}`} />
                        2. Gọi Gemini AI soạn email tự động
                      </span>
                      <span className="text-brand-on-surface-variant">{submissionStep >= 1 ? 'SUCCESS' : 'PENDING'}</span>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-brand-on-surface">
                        <span className={`w-2 h-2 rounded-full ${submissionStep >= 2 ? 'bg-emerald-400 animate-ping' : 'bg-white/10'}`} />
                        3. Gửi Email Phản Hồi Tự Động
                      </span>
                      <span className="text-brand-on-surface-variant">{submissionStep >= 2 ? 'SUCCESS' : 'PENDING'}</span>
                    </div>
                  </div>

                  {/* AI Response Display */}
                  {submissionStep === 3 && simulatedReply && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-md mx-auto text-left bg-linear-to-r from-brand-primary/5 to-brand-secondary/5 rounded-xl p-5 border border-brand-primary/20 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-brand-primary text-xs font-bold font-display uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-brand-secondary" /> AI Auto-Response Generated
                      </div>
                      <div className="p-4 bg-brand-surface-container rounded-lg border border-white/5 text-xs text-brand-on-surface leading-relaxed whitespace-pre-line italic">
                        {simulatedReply}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-brand-on-surface-variant">Hệ thống đã gửi bản nháp email này tới địa chỉ của bạn.</span>
                        <button
                          onClick={() => {
                            setSubmissionStep(-1);
                            setIsSubmitting(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-brand-surface-container hover:bg-brand-surface-container-high border border-white/10 text-[10px] text-brand-primary font-bold transition-all cursor-pointer"
                        >
                          Gửi tin nhắn mới
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* Inquiry history tracker view */
            <motion.div
              key="history-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <p className="text-xs text-brand-on-surface-variant">Lịch sử tin nhắn bạn đã gửi từ trình duyệt này (Lưu cục bộ)</p>
                <button
                  onClick={() => {
                    localStorage.removeItem('chanh_portfolio_inquiries');
                    setInquiries([]);
                    setActiveTab('form');
                  }}
                  className="text-[10px] text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Xóa tất cả
                </button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 bg-brand-surface-container rounded-xl border border-white/5 space-y-3 relative group">
                    <button
                      onClick={(e) => handleDeleteInquiry(inq.id, e)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/5 text-brand-on-surface-variant hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Xóa tin nhắn"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-white font-display">{inq.name}</h4>
                        <p className="text-[10px] text-brand-on-surface-variant font-mono">{inq.email} • {inq.timestamp}</p>
                      </div>
                    </div>

                    <p className="text-xs text-brand-on-surface bg-brand-surface-container-lowest p-3 rounded-lg border border-white/5 leading-relaxed">
                      "{inq.message}"
                    </p>

                    {inq.autoReply && (
                      <div className="p-3 bg-brand-primary/5 rounded-lg border border-brand-primary/15 space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-brand-primary font-display uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-brand-secondary" /> Phản hồi tự động từ AI:
                        </div>
                        <p className="text-[11px] text-brand-on-surface-variant italic leading-relaxed whitespace-pre-line">
                          {inq.autoReply}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
