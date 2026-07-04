import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const TAI_CHANH_INFO = `
Họ và tên: Lâm Tài Chánh
Vị trí: AI Automation Developer
Email: chanhlamtai355@gmail.com
Số điện thoại: 0389003748
Trường: Cao Đẳng Văn Lang Sài Gòn
Chuyên ngành: Công Nghệ Thông Tin
Kỹ năng: SQL, React, Tailwind CSS, n8n, Gemini AI, UML, ERD, Database Design
Dự án: Website tư vấn tuyển sinh tích hợp Chatbot AI, Hệ thống quản lý và đặt vé xem phim
`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const contents: any[] = [];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: `
Bạn là Trợ lý AI của Lâm Tài Chánh. Trả lời lịch sự, chuyên nghiệp, ngắn gọn.
Thông tin về Chánh:
${TAI_CHANH_INFO}
        `,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      reply: response.text || "Xin lỗi, tôi chưa có câu trả lời phù hợp.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "AI service error",
    });
  }
}