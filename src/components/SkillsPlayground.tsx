import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle2, Zap, Database, Mail, Terminal, Cpu, ArrowRight } from 'lucide-react';

interface WorkflowTemplate {
  id: string;
  name: string;
  trigger: string;
  triggerDesc: string;
  processor: string;
  processorDesc: string;
  action: string;
  actionDesc: string;
  payload: any;
}

const TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'recruit',
    name: 'Tự động phản hồi Nhà Tuyển Dụng',
    trigger: 'Recruiter Submit Form',
    triggerDesc: 'Khi form liên hệ trên portfolio được gửi.',
    processor: 'Gemini AI Sentiment & Reply Draft',
    processorDesc: 'AI phân tích lời nhắn, gắn nhãn độ ưu tiên và viết email dự thảo cá nhân hóa.',
    action: 'Send Automated Email Draft',
    actionDesc: 'Gửi email phản hồi tự động lập tức và thông báo qua SMS cho Chánh.',
    payload: {
      type: "CONTACT_FORM_SUBMIT",
      sentiment: "Positive / Urgent",
      intent: "Job Interview Offering",
      assignedPriority: "High",
      autoResponseStatus: "Queued"
    }
  },
  {
    id: 'lead',
    name: 'Phân loại tin nhắn Tuyển sinh',
    trigger: 'Facebook Webhook Trigger',
    triggerDesc: 'Nhận tin nhắn thắc mắc từ Messenger API.',
    processor: 'Gemini Admissions Retrieval Node',
    processorDesc: 'AI tìm kiếm thông tin điểm chuẩn, học phí và trả về câu trả lời chuẩn xác.',
    action: 'Reply Message & Log Google Sheet',
    actionDesc: 'Gửi tin nhắn phản hồi học sinh và ghi lại lịch sử tư vấn lên Google Sheet quản lý.',
    payload: {
      source: "Facebook Messenger API",
      intent: "Admission Tuition Query",
      retrievedDatabaseDocs: 2,
      confidenceScore: "98.5%",
      rowsLogged: "1 row appended to Sheet"
    }
  }
];

export default function SkillsPlayground() {
  const [activeTemplate, setActiveTemplate] = useState<string>('recruit');
  const [step, setStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);

  const selectedTemplate = TEMPLATES.find(t => t.id === activeTemplate) || TEMPLATES[0];

  const handleRunTest = () => {
    setIsRunning(true);
    setStep(0);
    setLog(["[system] Khởi chạy workflow tự động hóa...", `[trigger] Nhận sự kiện: ${selectedTemplate.trigger}`]);

    setTimeout(() => {
      setStep(1);
      setLog(prev => [
        ...prev,
        `[processor] Chuyển tiếp dữ liệu qua n8n AI node...`,
        `[processor] Gọi mô hình gemini-3.5-flash để xử lý: "${selectedTemplate.processorDesc}"`
      ]);
    }, 1200);

    setTimeout(() => {
      setStep(2);
      setLog(prev => [
        ...prev,
        `[action] Kích hoạt hành động đích: ${selectedTemplate.action}`,
        `[action] Trạng thái: ${selectedTemplate.actionDesc}`
      ]);
    }, 2400);

    setTimeout(() => {
      setStep(3);
      setLog(prev => [
        ...prev,
        `[system] ✔️ Workflow thực thi THÀNH CÔNG trong 3.2s!`
      ]);
      setIsRunning(false);
    }, 3600);
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10" id="ai-automation-playground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <span className="font-mono text-[10px] text-brand-secondary uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            <Zap className="w-3.5 h-3.5 animate-pulse text-brand-tertiary" /> Interactive Simulation
          </span>
          <h3 className="text-xl font-bold font-display text-white">
            Automation Node Playground
          </h3>
          <p className="text-xs text-brand-on-surface-variant">
            Hãy lựa chọn một kịch bản n8n tự động hóa dưới đây để chạy thử nghiệm tiến trình!
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/5 pb-4">
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => {
              if (isRunning) return;
              setActiveTemplate(t.id);
              setStep(-1);
              setLog([]);
            }}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTemplate === t.id
                ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30'
                : 'text-brand-on-surface-variant hover:text-white hover:bg-white/5'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* Visual Workflow Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Nodes flow visualizer */}
        <div className="lg:col-span-8 bg-brand-brand-surface-container-lowest/80 p-6 rounded-xl border border-white/5 relative min-h-[160px] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-2">
          {/* Node 1: Trigger */}
          <div className={`p-4 rounded-xl border text-center w-full md:w-56 transition-all ${
            step >= 0 
              ? 'bg-brand-primary/15 border-brand-primary text-brand-primary scale-102 shadow-lg shadow-brand-primary/10'
              : 'bg-brand-surface border-white/5 text-brand-on-surface-variant'
          }`}>
            <div className="w-8 h-8 rounded-full bg-brand-surface-container-high mx-auto mb-2 flex items-center justify-center text-brand-primary">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold font-display text-white mb-1">1. TRIGGER</h4>
            <p className="text-[10px] text-brand-on-surface-variant">{selectedTemplate.trigger}</p>
          </div>

          <ArrowRight className="w-5 h-5 text-brand-on-surface-variant rotate-90 md:rotate-0" />

          {/* Node 2: AI Processor */}
          <div className={`p-4 rounded-xl border text-center w-full md:w-56 transition-all ${
            step >= 1 
              ? 'bg-brand-secondary/15 border-brand-secondary text-brand-secondary scale-102 shadow-lg shadow-brand-secondary/10'
              : 'bg-brand-surface border-white/5 text-brand-on-surface-variant'
          }`}>
            <div className="w-8 h-8 rounded-full bg-brand-surface-container-high mx-auto mb-2 flex items-center justify-center text-brand-secondary">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold font-display text-white mb-1">2. AI PROCESS</h4>
            <p className="text-[10px] text-brand-on-surface-variant">{selectedTemplate.processor}</p>
          </div>

          <ArrowRight className="w-5 h-5 text-brand-on-surface-variant rotate-90 md:rotate-0" />

          {/* Node 3: Action */}
          <div className={`p-4 rounded-xl border text-center w-full md:w-56 transition-all ${
            step >= 2 
              ? 'bg-brand-tertiary/15 border-brand-tertiary text-brand-tertiary scale-102 shadow-lg shadow-brand-tertiary/10'
              : 'bg-brand-surface border-white/5 text-brand-on-surface-variant'
          }`}>
            <div className="w-8 h-8 rounded-full bg-brand-surface-container-high mx-auto mb-2 flex items-center justify-center text-brand-tertiary">
              <Database className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold font-display text-white mb-1">3. ACTION</h4>
            <p className="text-[10px] text-brand-on-surface-variant">{selectedTemplate.action}</p>
          </div>
        </div>

        {/* Console / Output logs */}
        <div className="lg:col-span-4 flex flex-col h-full space-y-4">
          {/* Action trigger button */}
          <button
            onClick={handleRunTest}
            disabled={isRunning}
            className="w-full py-3 rounded-xl bg-linear-to-r from-brand-primary to-brand-secondary text-brand-surface font-bold text-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-98 cursor-pointer disabled:opacity-50 disabled:scale-100 transition-all glow-secondary"
          >
            <Play className="w-4 h-4 fill-brand-surface" /> KÍCH HOẠT WORKFLOW
          </button>

          {/* Console Window */}
          <div className="flex-1 min-h-[160px] bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-[10px] space-y-1.5 text-emerald-400 overflow-y-auto max-h-[220px]">
            <div className="flex justify-between text-brand-on-surface-variant border-b border-white/5 pb-1 mb-2">
              <span>n8n execution log</span>
              <span className="animate-pulse">● LIVE</span>
            </div>
            {log.length === 0 ? (
              <p className="text-brand-on-surface-variant italic">Chờ kích hoạt kịch bản...</p>
            ) : (
              log.map((line, idx) => (
                <div key={idx} className="leading-relaxed">
                  {line}
                </div>
              ))
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 p-2 bg-brand-surface-container border border-white/10 rounded-lg text-white"
              >
                <div className="text-[9px] text-brand-secondary font-bold uppercase mb-1">Dữ liệu đầu ra (Simulated Output)</div>
                <pre className="text-[8px] text-brand-on-surface-variant">{JSON.stringify(selectedTemplate.payload, null, 2)}</pre>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
