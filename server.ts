import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Lâm Tài Chánh Personal Knowledge Base
const TAI_CHANH_INFO = `
Họ và tên: Lâm Tài Chánh
Vị trí: AI Automation Developer
Email liên hệ: chanhlamtai355@gmail.com
Số điện thoại: 0389003748
Địa chỉ: TP. Hồ Chí Minh, Việt Nam
GPA hiện tại: 3.43 / 4.0
Chứng chỉ ngoại ngữ: TOCFL A1 (Mandarin/Tiếng Trung)

Quá trình Học vấn:
- Trường Cao Đẳng Văn Lang Sài Gòn (Niên khóa: 2024 — 2026)
- Chuyên ngành: Công Nghệ Thông Tin (IT)
- Chi tiết: Tập trung vào công nghệ web, cấu trúc dữ liệu, phân tích thiết kế hệ thống, thiết kế cơ sở dữ liệu và triển khai AI.

Kỹ năng cốt lõi (Core Competencies):
1. SQL: Sử dụng PostgreSQL, MySQL thành thạo.
2. AI Automation: Sử dụng n8n để xây dựng workflow tự động hóa, tích hợp Gemini AI và các mô hình ngôn ngữ lớn khác để xử lý tác vụ thông minh.
3. System Analysis (Phân tích hệ thống): Vẽ biểu đồ UML, thiết kế Use Case, phân tích nghiệp vụ.
4. Database Design (Thiết kế CSDL): Vẽ ERD, chuẩn hóa dữ liệu (Normalization).
5. Front-end: Sử dụng React và Tailwind CSS để xây dựng giao diện người dùng đẹp mắt, responsive.

Các dự án nổi bật (Featured Projects):
1. Website Tư vấn tuyển sinh tích hợp Chatbot AI (AI & Automation Project):
   - Mô tả: Nền tảng tư vấn tuyển sinh sáng tạo sử dụng AI của Gemini thông qua các kịch bản n8n tự động hóa để cung cấp câu trả lời ngay lập tức, chính xác cho học sinh/phụ huynh tiềm năng qua API Facebook Messenger.
   - Công nghệ sử dụng: ReactJS, n8n, Gemini AI.
2. Hệ thống quản lý và đặt vé xem phim (Cinema Ticket Booking System - System Architecture Project):
   - Mô tả: Dự án thiết kế kiến trúc hệ thống toàn diện, tập trung vào phân tích yêu cầu nghiêm ngặt, mô hình hóa Use Case, và thiết kế sơ đồ thực thể mối quan hệ (ERD) chi tiết cho một hệ sinh thái đặt vé trực tuyến có khả năng mở rộng.
   - Công nghệ sử dụng: UML, MySQL, Thiết kế hệ thống (System Design).
`;

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured. Please add it to your secrets inside AI Studio settings." 
      });
    }

    // Format chat contents with history if available
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: `Bạn là Trợ lý ảo AI cực kỳ thông minh của anh Lâm Tài Chánh. Hãy đại diện anh Chánh trả lời các câu hỏi từ các nhà tuyển dụng, đối tác hoặc khách truy cập vào trang Portfolio này một cách lịch sự, tự tin, chuyên nghiệp, súc tích và chính xác.
        
Dưới đây là thông tin chi tiết về anh Lâm Tài Chánh mà bạn PHẢI tuân thủ tuyệt đối:
${TAI_CHANH_INFO}

Nguyên tắc trả lời:
1. Hãy luôn thân thiện, lịch sự và súc tích. Sử dụng tiếng Việt tự nhiên và trôi chảy. Nếu khách hỏi bằng tiếng Anh hoặc tiếng Trung, hãy trả lời bằng ngôn ngữ tương ứng.
2. Quảng bá thế mạnh của anh Chánh về AI Automation (n8n, Gemini AI), khả năng thiết kế hệ thống và CSDL bài bản, và định hướng thực tế giúp doanh nghiệp tiết kiệm chi phí, tự động hóa quy trình.
3. Khi người dùng hỏi thông tin liên hệ, hãy cung cấp rõ Email (chanhlamtai355@gmail.com), Số điện thoại (0389003748) hoặc khuyến khích họ gửi form liên hệ trực tiếp bên dưới website.
4. Tránh bịa đặt các thông tin ngoài danh sách trên. Nếu không biết hoặc không có thông tin, hãy khéo léo nói rằng anh Chánh sẽ trực tiếp phản hồi kỹ hơn khi họ liên hệ.`,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Xin lỗi, tôi gặp chút sự cố khi phản hồi. Bạn có thể thử lại nhé!";
    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI assistant service." });
  }
});

// Simulates an automated "AI review/auto-reply" for contact submissions
app.post("/api/contact-analyze", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback if no key
      return res.json({
        autoReply: `Chào ${name}, cảm ơn bạn đã liên hệ! Anh Chánh đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất qua email: ${email}.`
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Phân tích lời nhắn sau đây gửi đến Lâm Tài Chánh (AI Automation Developer) và viết một email phản hồi nhanh tự động (auto-reply) mang tính chuyên nghiệp, cá nhân hóa, thể hiện sự quan tâm sâu sắc từ phía anh Chánh.
      
Người gửi: ${name}
Email người gửi: ${email}
Lời nhắn: "${message}"`,
      config: {
        systemInstruction: "Bạn là hệ thống Tự động hóa Email thông minh của Lâm Tài Chánh. Hãy viết một phản hồi tự động súc tích (dưới 150 từ), lịch sự, xác nhận đã nhận được lời nhắn và hứa sẽ phản hồi chi tiết sớm nhất. Giọng điệu ấm áp, chuyên nghiệp.",
        temperature: 0.7,
      }
    });

    const autoReply = response.text || `Chào ${name}, cảm ơn bạn đã liên hệ! Anh Chánh đã nhận được tin nhắn của bạn và sẽ phản hồi sớm nhất.`;
    res.json({ autoReply });
  } catch (error: any) {
    console.error("Contact analyze error:", error);
    res.json({
      autoReply: `Cảm ơn ${name} đã gửi lời nhắn! Anh Chánh đã nhận được thông tin và sẽ sớm liên lạc lại với bạn qua email: ${email}.`
    });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
