import React, { useState, useEffect } from 'react';
import { Project } from './types';
import ChatBot from './components/ChatBot';
import CaseStudyModal from './components/CaseStudyModal';
import SkillsPlayground from './components/SkillsPlayground';
import ContactForm from './components/ContactForm';
import { 
  Database, 
  Cpu, 
  Layers, 
  Network, 
  Play, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  Menu, 
  X, 
  Linkedin, 
  Github, 
  Code, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Briefcase, 
  Activity, 
  Workflow, 
  Award, 
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PROJECTS: Project[] = [
  {
    id: 'chatbot',
    title: 'Website Tư vấn tuyển sinh tích hợp Chatbot AI',
    description: 'Nền tảng tư vấn tuyển sinh sáng tạo sử dụng AI của Gemini thông qua các kịch bản n8n tự động hóa để cung cấp câu trả lời ngay lập tức, chính xác cho học sinh/phụ huynh tiềm năng qua API Facebook Messenger.',
    category: 'AI & Automation',
    categoryTag: 'AI & Automation',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7GdpNf-6BlXgM4sctovZX-c2AD7BopmquKeIrzBcCReU8eYhWvOwBl9RM7nEOUGVPj_20MuhznOeq8eCtqPQEXerCdxq8hj3gRtVnJACaHdHtwfUmHYi2kul9zXe2hNEbAF0AbY0wi4uI2Usn_YwEfxnQr1mQupxlxVGnCMQLsmSC5T86hurXO5C_EmJ4VXd91XZpdT_dCa6HzR_WraIaYWYplPZbOmAe-3AJtMiBBNAo0UfBcBP2Qk6Dn3v8KvkuSMzGRrdyC_g',
    techStack: ['ReactJS', 'n8n', 'Gemini AI', 'Facebook Graph API'],
    caseStudy: {
      challenge: 'Phòng tuyển sinh của trường cao đẳng thường xuyên bị quá tải bởi hàng ngàn câu hỏi lặp đi lặp lại về học phí, điểm chuẩn, ngành học, gây chậm trễ trong phản hồi và mất đi các học sinh tiềm năng.',
      solution: 'Xây dựng một hệ thống chatbot tự động kết nối qua Facebook Messenger API. Sử dụng n8n làm lõi điều hợp (orchestrator) để nhận webhook tin nhắn, chuyển nội dung đến mô hình ngôn ngữ lớn Gemini AI thông qua một bộ dữ liệu tri thức của trường được tối ưu hóa (RAG), và tự động gửi phản hồi chính xác đến người dùng trong vòng chưa đầy 2 giây.',
      results: [
        'Giảm 85% thời gian phản hồi trung bình (từ vài giờ xuống còn dưới 2 giây).',
        'Tự động xử lý thành công 90% các câu hỏi thường gặp mà không cần sự can thiệp của con người.',
        'Thu thập dữ liệu lead (số điện thoại, email) của học sinh tiềm năng chuyển thẳng vào Google Sheets cho đội tuyển sinh gọi điện tư vấn trực tiếp.'
      ],
      workflowNodes: [
        { id: 'web_msg', title: 'FB Webhook', description: 'Nhận gói tin nhắn trực tiếp từ Facebook Messenger API.', icon: 'webhook' },
        { id: 'rag_search', title: 'RAG Retriever', description: 'Trích xuất thông tin học phí & điểm chuẩn liên quan từ CSDL.', icon: 'manage_search' },
        { id: 'gemini_agent', title: 'Gemini AI Node', description: 'Xử lý ngôn ngữ tự nhiên, soạn câu trả lời thân thiện, chính xác.', icon: 'auto_awesome' },
        { id: 'fb_send', title: 'FB Send API', description: 'Gửi tin nhắn phản hồi trực tiếp cho học sinh trên Messenger.', icon: 'send' }
      ]
    }
  },
  {
    id: 'booking',
    title: 'Hệ thống quản lý và đặt vé xem phim',
    description: 'Dự án thiết kế kiến trúc hệ thống toàn diện, tập trung vào phân tích yêu cầu nghiêm ngặt, mô hình hóa Use Case, và thiết kế sơ đồ thực thể mối quan hệ (ERD) chi tiết cho một hệ sinh thái đặt vé trực tuyến có khả năng mở rộng.',
    category: 'System Architecture',
    categoryTag: 'System Architecture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYymfpSnH9gsjx9e0HusVWdaPJYTeWYqh198IJWi6qj5_gwO-hbECfSp8O-Y1jLQN2LDxQeEtPbPY8mX6-iKfXKchQXytrqwvvbouv0kvotKeyaE5N-zAHX8t87L3G7JNMOvSo-eyRjgbbcW_SxyV0W0EPXEu2R0cVNt_TOGzTlsltbf7NtgrAxT4nDYi0hJN_0UdizrKj4LIwcJrsPplig0iVfISpsAc9eABDmWKKsSpjHkBCXbDFDB7xdDNTQM1PxsRkohasWS0',
    techStack: ['UML', 'MySQL', 'System Design', 'Database Normalization'],
    caseStudy: {
      challenge: 'Thiết kế một hệ thống bán vé chiếu phim có tính chịu tải cao và đồng bộ ghế ngồi thời gian thực, tránh tình trạng trùng ghế (double booking) và quản lý lịch chiếu phức tạp của nhiều phòng chiếu.',
      solution: 'Phân tích và mô hình hóa hệ thống bằng sơ đồ Use Case chi tiết và sơ đồ lớp UML. Thiết kế kiến trúc cơ sở dữ liệu quan hệ MySQL chuẩn hóa 3NF để giảm thiểu trùng lặp dữ liệu, đồng thời xây dựng mô hình khóa bi-directional (ghế ngồi - suất chiếu) giúp tối ưu hóa truy vấn kiểm tra trạng thái ghế ngồi thời gian thực.',
      results: [
        'Đưa ra bản đặc tả thiết kế hoàn chỉnh với hơn 15 biểu đồ UML (Use Case, Sequence, Class diagrams).',
        'Cấu trúc cơ sở dữ liệu được tối ưu hóa đạt chuẩn 3NF, loại bỏ 100% rủi ro bất thường dữ liệu khi cập nhật.',
        'Đề xuất thuật toán khóa ghế tạm thời trong 5 phút (session lock) giải quyết triệt để rủi ro trùng lặp thanh toán ghế.'
      ],
      workflowNodes: [
        { id: 'req_analysis', title: 'Phân tích Yêu cầu', description: 'Đặc tả yêu cầu chức năng đặt vé, chọn ghế, thanh toán.', icon: 'analytics' },
        { id: 'uml_model', title: 'Thiết kế UML', description: 'Vẽ Use Case và Class Diagram định nghĩa thực thể.', icon: 'architecture' },
        { id: 'db_design', title: 'Thiết kế CSDL', description: 'Xây dựng sơ đồ ERD chuẩn hóa dữ liệu 3NF.', icon: 'schema' },
        { id: 'realtime_flow', title: 'Đồng bộ Ghế', description: 'Mô tả luồng kiểm tra khóa ghế tạm thời khi thanh toán.', icon: 'sync_alt' }
      ]
    }
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Monitor scrolling to highlight active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      let currentSection = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface text-brand-on-surface font-sans selection:bg-brand-secondary/30 selection:text-brand-secondary overflow-x-hidden relative">
      {/* Visual Neural Network Particle Accents */}
      <div className="absolute top-0 left-0 right-0 h-[100vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-secondary/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-[120vh] right-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-brand-secondary/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Header / TopNavBar */}
      <header className="bg-brand-surface/80 backdrop-blur-xl fixed w-full top-0 z-50 border-b border-white/5">
        <nav className="flex justify-between items-center w-full px-6 md:px-20 py-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-xl sm:text-2xl font-bold text-white tracking-tighter cursor-pointer flex items-center gap-2"
            onClick={() => handleNavClick('home')}
          >
            Lâm Tài Chánh <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {['TRANG CHỦ', 'GIỚI THIỆU', 'KỸ NĂNG', 'DỰ ÁN', 'HỌC VẤN', 'LIÊN HỆ'].map((item) => {
              const ids = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
              const currentId = ids[['TRANG CHỦ', 'GIỚI THIỆU', 'KỸ NĂNG', 'DỰ ÁN', 'HỌC VẤN', 'LIÊN HỆ'].indexOf(item)];
              const isActive = activeSection === currentId;

              return (
                <button
                  key={item}
                  onClick={() => handleNavClick(currentId)}
                  className={`font-semibold tracking-wider text-xs transition-colors duration-300 relative py-1.5 cursor-pointer uppercase ${
                    isActive ? 'text-brand-secondary' : 'text-brand-on-surface-variant hover:text-white'
                  }`}
                >
                  {item}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-secondary"
                    />
                  )}
                </button>
              );
            })}
            
            <button 
              onClick={() => handleNavClick('contact')}
              className="bg-brand-primary text-brand-surface px-5 py-2 rounded-full font-bold hover:scale-105 transition-all active:scale-95 text-xs tracking-wider cursor-pointer font-display"
            >
              Tuyển dụng tôi
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-1 hover:bg-white/5 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-surface-container border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {['TRANG CHỦ', 'GIỚI THIỆU', 'KỸ NĂNG', 'DỰ ÁN', 'HỌC VẤN', 'LIÊN HỆ'].map((item) => {
                  const ids = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
                  const currentId = ids[['TRANG CHỦ', 'GIỚI THIỆU', 'KỸ NĂNG', 'DỰ ÁN', 'HỌC VẤN', 'LIÊN HỆ'].indexOf(item)];
                  const isActive = activeSection === currentId;

                  return (
                    <button
                      key={item}
                      onClick={() => handleNavClick(currentId)}
                      className={`text-left font-bold text-xs py-2 tracking-widest cursor-pointer uppercase ${
                        isActive ? 'text-brand-secondary' : 'text-brand-on-surface-variant hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-brand-primary text-brand-surface py-3 rounded-xl font-bold hover:opacity-90 active:scale-[0.99] text-xs uppercase tracking-widest cursor-pointer font-display"
                >
                  Tuyển dụng tôi
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center py-16 md:py-0" id="home">
          <div className="w-full px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left intro text */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-mono">AVAILABLE FOR NEW PROJECTS</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl font-extrabold font-display leading-[1.15] text-white tracking-tight">
                  Xin chào, tôi là <br />
                  <span className="text-gradient font-black">Lâm Tài Chánh</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-brand-on-surface-variant font-display flex items-center gap-2">
                  AI Automation Developer <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full animate-pulse" />
                </h2>
              </div>

              <p className="text-sm sm:text-base text-brand-on-surface-variant max-w-xl leading-relaxed">
                Điều phối trí tuệ thông qua các quy trình tự động hóa phức tạp và tích hợp AI tạo năng suất để giải quyết các thách thức kinh doanh một cách hiệu quả nhất.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button 
                  onClick={() => handleNavClick('projects')}
                  className="bg-brand-primary text-brand-surface px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition-all cursor-pointer glow-primary text-xs tracking-wider uppercase font-display"
                >
                  Xem dự án của tôi
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleNavClick('contact')}
                  className="glass-card text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 active:scale-98 transition-all cursor-pointer text-xs tracking-wider uppercase border border-white/10"
                >
                  Liên hệ với tôi
                </button>
              </div>
            </div>

            {/* Right photo frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden group shadow-2xl">
                {/* Image background glow */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-700" />
                
                {/* The main image box */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-brand-surface-container border border-white/10">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABndl0vS4ta5wFJ4DfHsY6RWz5f25VtAwDmmRO5q9Jb1Yn5FuXbDcouwpUZfmdyKm8wGXlmXvcR2Tio6TVgpez_wyESjD_esppLgHe8J77rw2Qp3yKZ9m3P4FUYj3rhCA3ZcYtH7SlWINAQwUMVn96b3uApbk51xGM5U4ssRWpfODRMlJ2gbnsRmZnmHD4enT9lPHTN_agLAW-7MMcz4djwqOMQLkIy0Ij8ZoKNsd1aWNOc7adBF3CbgXD0rGaLcX4V_z7RqFirlc" 
                    alt="Lâm Tài Chánh Portrait" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 scale-[1.03] hover:scale-100 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* About Section */}
        <section className="py-24 border-t border-white/5" id="about">
          <div className="px-6 md:px-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* Narrative block */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-brand-secondary tracking-widest font-mono">BIOGRAPHY</span>
                  <h2 className="text-3xl font-bold text-white font-display">About Me</h2>
                  <div className="h-1 w-16 bg-brand-secondary rounded-full" />
                </div>
                
                <div className="space-y-4 text-sm text-brand-on-surface-variant leading-relaxed">
                  <p>
                    Tôi là một nhà phát triển Tự động hóa AI (AI Automation Developer) đầy nhiệt huyết, tận tụy kiến tạo các giải pháp thông minh tối ưu hóa quy trình. Với nền tảng kiến thức CNTT vững chắc và niềm đam mê đặc biệt cho tự động hóa, tôi chuyên sâu thiết kế quy trình nghiệp vụ thông minh qua công cụ n8n và tích hợp các mô hình ngôn ngữ lớn hàng đầu như Gemini AI.
                  </p>
                  <p>
                    Mục tiêu tối thượng của tôi là thúc đẩy nâng cao hiệu suất làm việc doanh nghiệp và nâng tầm trải nghiệm số của người dùng thông qua công nghệ tiên phong - từ chuẩn hóa cơ sở dữ liệu cho đến triển khai robot trợ lý AI thông minh đa nền tảng. Tôi luôn sẵn sàng đón nhận những thách thức phức tạp để mang tự động hóa chạm sâu vào từng hoạt động vận hành thường nhật.
                  </p>
                </div>
              </div>

              {/* Stats Grid cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-center text-center space-y-1 hover:border-brand-primary/30 transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-brand-primary font-display">3.43</span>
                  <span className="text-[10px] uppercase font-bold text-brand-on-surface-variant tracking-widest font-mono">Current GPA</span>
                </div>
                
                <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-center text-center space-y-1 hover:border-brand-secondary/30 transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-brand-secondary font-display">AI</span>
                  <span className="text-[10px] uppercase font-bold text-brand-on-surface-variant tracking-widest font-mono">Specialization</span>
                </div>

                <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-center text-center space-y-1 hover:border-brand-primary/30 transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-brand-primary font-display">TOCFL</span>
                  <span className="text-[10px] uppercase font-bold text-brand-on-surface-variant tracking-widest font-mono">Mandarin (A1)</span>
                </div>

                <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-center text-center space-y-1 hover:border-brand-secondary/30 transition-all">
                  <span className="text-3xl sm:text-4xl font-extrabold text-brand-secondary font-display">n8n</span>
                  <span className="text-[10px] uppercase font-bold text-brand-on-surface-variant tracking-widest font-mono">Expertise Level</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Competencies Section */}
        <section className="py-24 bg-brand-surface-container-lowest/20 border-t border-white/5" id="skills">
          <div className="px-6 md:px-20 max-w-7xl mx-auto space-y-16">
            
            {/* Title banner */}
            <div className="text-center space-y-3">
              <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest font-mono">TECH STACK</span>
              <h2 className="text-3xl font-bold font-display text-white">Core Competencies</h2>
              <p className="text-xs sm:text-sm text-brand-on-surface-variant max-w-lg mx-auto leading-relaxed">
                Năng lực chuyên môn vững chắc tại điểm giao thoa giữa Kỹ nghệ phần mềm thực hành và Trí tuệ nhân tạo tạo năng suất.
              </p>
            </div>

            {/* Core Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Skill 1 */}
              <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4 hover:border-brand-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-display mb-1">SQL</h3>
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">PostgreSQL</span>
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">MySQL</span>
                  </div>
                </div>
              </div>

              {/* Skill 2 */}
              <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4 hover:border-brand-secondary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-display mb-1">AI Automation</h3>
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">n8n</span>
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">Gemini</span>
                  </div>
                </div>
              </div>

              {/* Skill 3 */}
              <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4 hover:border-brand-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-display mb-1">System Analysis</h3>
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">UML</span>
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">Use Case</span>
                  </div>
                </div>
              </div>

              {/* Skill 4 */}
              <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4 hover:border-brand-secondary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-display mb-1">Database Design</h3>
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">ERD</span>
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">Normalization</span>
                  </div>
                </div>
              </div>

              {/* Skill 5 */}
              <div className="glass-card p-6 rounded-xl border border-white/5 flex flex-col items-center text-center space-y-4 hover:border-brand-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <Code className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-display mb-1">Front-end</h3>
                  <div className="flex flex-wrap justify-center gap-1">
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">React</span>
                    <span className="text-[8px] font-bold font-mono border border-white/10 px-1.5 py-0.5 rounded text-brand-on-surface-variant uppercase">Tailwind</span>
                  </div>
                </div>
              </div>

            </div>

            {/* AI Interactive Node Simulation Playground */}
            <SkillsPlayground />

          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 border-t border-white/5" id="projects">
          <div className="px-6 md:px-20 max-w-7xl mx-auto space-y-16">
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest font-mono">PORTFOLIO</span>
              <h2 className="text-3xl font-bold font-display text-white">Featured Projects</h2>
              <div className="h-1 w-16 bg-brand-secondary rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
              {PROJECTS.map((project) => (
                <div 
                  key={project.id} 
                  className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-white/15 transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden bg-brand-surface-container-high">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/40 to-transparent"></div>
                    
                    <span className="absolute bottom-4 left-4 px-3 py-1 text-[9px] font-bold rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-secondary transition-colors font-display">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Tags row */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="font-mono text-[9px] font-semibold text-brand-on-surface-variant bg-white/5 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Launch case study */}
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full py-3 bg-white/5 hover:bg-brand-secondary/20 text-white hover:text-brand-secondary border border-white/10 hover:border-brand-secondary/30 rounded-xl transition-all font-bold text-xs cursor-pointer uppercase tracking-wider font-display"
                      >
                        View Case Study
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Education Section */}
        <section className="py-24 bg-brand-surface-container-lowest/20 border-t border-white/5" id="education">
          <div className="px-6 md:px-20 max-w-7xl mx-auto space-y-16">
            
            <h2 className="text-3xl font-bold font-display text-white text-center">Education Journey</h2>

            <div className="max-w-3xl mx-auto relative pl-6 sm:pl-10 border-l border-white/15 space-y-8">
              {/* Event node */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 bg-brand-primary rounded-full border-4 border-brand-surface glow-primary" />
                
                <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4 hover:border-brand-primary/20 transition-all">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-white/5 pb-3">
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">Cao Đẳng Văn Lang Sài Gòn</h3>
                      <p className="text-xs text-brand-primary font-mono mt-1 font-semibold">Chuyên ngành: Công Nghệ Thông Tin</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-bold font-mono shrink-0">
                      2024 — 2026
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                    Tập trung nghiên cứu chuyên sâu về các mô hình phát triển phần mềm hiện đại, kiến trúc ứng dụng web, chuẩn hóa thiết kế cơ sở dữ liệu và tối ưu hóa quy trình làm việc tự động tích hợp Trí tuệ nhân tạo.
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-secondary/10 border border-brand-secondary/25 rounded-xl text-brand-secondary font-bold text-xs tracking-wider">
                    <Award className="w-4 h-4" />
                    <span>Current GPA: 3.43 / 4.0</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Get In Touch Section */}
        <section className="py-24 border-t border-white/5" id="contact">
          <div className="px-6 md:px-20 max-w-7xl mx-auto space-y-16">
            
            <div className="text-center space-y-3">
              <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest font-mono">GET IN TOUCH</span>
              <h2 className="text-3xl font-extrabold font-display text-white">Sẵn sàng để tự động hóa thế giới của bạn?</h2>
              <div className="h-1 w-16 bg-brand-primary mx-auto rounded-full" />
            </div>

            {/* Quick Contact cards info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <a 
                href="mailto:chanhlamtai355@gmail.com" 
                className="glass-card p-8 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center space-y-3 hover:border-brand-primary/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-on-surface-variant font-mono uppercase tracking-wider">Email</h4>
                  <p className="text-sm font-semibold text-white mt-1">chanhlamtai355@gmail.com</p>
                </div>
              </a>

              <a 
                href="tel:0389003748" 
                className="glass-card p-8 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center space-y-3 hover:border-brand-secondary/30 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-on-surface-variant font-mono uppercase tracking-wider">Phone</h4>
                  <p className="text-sm font-semibold text-white mt-1">0389003748</p>
                </div>
              </a>

              <div className="glass-card p-8 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center space-y-3 hover:border-brand-primary/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-on-surface-variant font-mono uppercase tracking-wider">Location</h4>
                  <p className="text-sm font-semibold text-white mt-1">TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </div>

            </div>

            {/* Smart Automated Contact Form */}
            <ContactForm />

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-brand-surface-container-lowest py-12 border-t border-white/5 relative z-10">
        <div className="px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-xl font-bold font-display text-white tracking-tighter cursor-pointer flex items-center gap-1.5" onClick={() => handleNavClick('home')}>
            Lâm Tài Chánh <span className="w-1 h-1 bg-brand-primary rounded-full animate-ping" />
          </div>

          <p className="text-xs text-brand-on-surface-variant text-center font-mono">
            © 2026 Lâm Tài Chánh. Personal Portfolio Website.
          </p>

          <div className="flex gap-6">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="referrer"
              className="text-brand-on-surface-variant hover:text-brand-primary transition-colors text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="referrer"
              className="text-brand-on-surface-variant hover:text-brand-secondary transition-colors text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>

        </div>
      </footer>

      {/* Floating AI Chatbot assistant representing Admissions AI chatbot capabilities */}
      <ChatBot />

      {/* Interactive Case Study modal portal sheet */}
      <CaseStudyModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

    </div>
  );
}
