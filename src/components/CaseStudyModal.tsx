import React, { useState } from 'react';
import { Project, WorkflowNode } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Cpu, Layers, Activity, Network, Play, Eye, Settings, HelpCircle } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [simulationStep, setSimulationStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  if (!project) return null;

  const runWorkflowSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    const nodes = project.caseStudy.workflowNodes;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < nodes.length) {
        setSimulationStep(currentStep);
        setActiveNode(nodes[currentStep].id);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationStep(-1);
        setActiveNode(null);
      }
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-4xl bg-brand-surface-container rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col my-8 max-h-[90vh]"
        >
          {/* Header */}
          <div className="relative h-48 sm:h-64 bg-brand-surface-container-high overflow-hidden border-b border-white/5">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface-container to-transparent"></div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white hover:text-brand-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30 uppercase tracking-widest mb-2 inline-block">
                {project.categoryTag}
              </span>
              <h2 className="text-xl sm:text-3xl font-bold font-display text-white mt-1">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Project Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Challenges & Solutions */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-brand-primary flex items-center gap-2 mb-3">
                    <Layers className="w-5 h-5 text-brand-secondary" /> Thách thức nghiệp vụ
                  </h3>
                  <p className="text-sm text-brand-on-surface-variant leading-relaxed">
                    {project.caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-brand-primary flex items-center gap-2 mb-3">
                    <Cpu className="w-5 h-5 text-brand-secondary" /> Giải pháp tối ưu
                  </h3>
                  <p className="text-sm text-brand-on-surface-variant leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Right Column: Outcomes */}
              <div className="p-6 bg-brand-surface-container-high/50 rounded-xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold font-display text-brand-secondary flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-primary" /> Kết quả đạt được
                </h3>
                <ul className="space-y-3">
                  {project.caseStudy.results.map((result, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-sm text-brand-on-surface">
                      <span className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5 shrink-0"></span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Workflow Simulator */}
            <div className="space-y-4 border-t border-white/5 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                    <Network className="w-5 h-5 text-brand-secondary" /> Sơ đồ luồng xử lý tự động (Workflow n8n)
                  </h3>
                  <p className="text-xs text-brand-on-surface-variant">
                    Click từng bước hoặc chạy mô phỏng để xem tiến trình xử lý tự động hóa vận hành.
                  </p>
                </div>

                <button
                  onClick={runWorkflowSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-lg bg-linear-to-r from-brand-primary to-brand-secondary text-brand-surface font-semibold text-xs flex items-center gap-1.5 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer glow-secondary"
                >
                  <Play className="w-3.5 h-3.5 fill-brand-surface" /> {isSimulating ? 'Đang mô phỏng...' : 'Mô phỏng Workflow'}
                </button>
              </div>

              {/* Node Layout Canvas */}
              <div className="relative p-6 sm:p-10 bg-brand-surface-container-lowest/80 rounded-xl border border-white/5 overflow-x-auto min-h-[220px]">
                {/* Visual Connection line */}
                <div className="hidden md:block absolute top-[85px] left-12 right-12 h-1 bg-brand-surface-container-high rounded-full overflow-hidden z-0">
                  <motion.div 
                    className="h-full bg-linear-to-r from-brand-primary to-brand-secondary"
                    initial={{ width: '0%' }}
                    animate={{ width: isSimulating ? '100%' : '0%' }}
                    transition={{ duration: project.caseStudy.workflowNodes.length * 1.8, ease: 'linear' }}
                  />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
                  {project.caseStudy.workflowNodes.map((node, index) => {
                    const isCompleted = index <= simulationStep;
                    const isActive = index === simulationStep || activeNode === node.id;

                    return (
                      <div key={node.id} className="flex flex-col items-center max-w-[150px] text-center shrink-0 w-full md:w-auto">
                        <motion.button
                          onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all cursor-pointer relative ${
                            isActive 
                              ? 'bg-brand-secondary border-brand-secondary text-brand-surface scale-110 shadow-lg shadow-brand-secondary/30'
                              : isCompleted
                              ? 'bg-brand-primary/20 border-brand-primary text-brand-primary'
                              : 'bg-brand-surface border-white/10 text-brand-on-surface-variant hover:border-brand-primary/50'
                          }`}
                          whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                        >
                          <span className="material-symbols-outlined text-2xl">
                            {node.icon}
                          </span>
                          
                          {/* Step number badge */}
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-surface-container-high border border-white/10 text-[10px] font-bold text-brand-on-surface flex items-center justify-center">
                            {index + 1}
                          </span>
                        </motion.button>
                        
                        <h4 className="text-xs font-bold text-white mt-3 font-display">
                          {node.title}
                        </h4>
                        
                        <p className="text-[10px] text-brand-on-surface-variant mt-1 hidden md:block line-clamp-1">
                          {node.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Explanatory Tooltip Panel */}
                <AnimatePresence mode="wait">
                  {activeNode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-8 p-4 bg-brand-surface-container rounded-xl border border-white/10 flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary shrink-0 mt-0.5">
                        <Settings className="w-4 h-4 animate-spin [animation-duration:8s]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-brand-primary font-mono uppercase tracking-wider">
                          Chi tiết nút: {project.caseStudy.workflowNodes.find(n => n.id === activeNode)?.title}
                        </h4>
                        <p className="text-xs text-brand-on-surface mt-1 leading-relaxed">
                          {project.caseStudy.workflowNodes.find(n => n.id === activeNode)?.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-brand-surface-container-high/50 border-t border-white/5 flex justify-between items-center text-[10px] text-brand-on-surface-variant">
            <span className="font-mono">PROJECT: {project.id.toUpperCase()}</span>
            <span>Click từng bước để nghiên cứu cấu trúc</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
