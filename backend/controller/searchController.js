import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import Course from "../model/courseModel.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const searchCourses = async (term) => {
  if (!term) return [];
  return Course.find({
    isPublished: true,
    $or: [
      { title: { $regex: term, $options: "i" } },
      { subTitle: { $regex: term, $options: "i" } },
      { description: { $regex: term, $options: "i" } },
      { category: { $regex: term, $options: "i" } },
      { level: { $regex: term, $options: "i" } },
    ],
  });
};

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || input.trim().length < 3) {
      return res.status(400).json({ message: "Search query too short" });
    }

    // 1️⃣ DB FIRST
    let courses = await searchCourses(input);
    if (courses.length) {
      return res.status(200).json(courses);
    }

    // 2️⃣ DEV MODE MOCK (VERY IMPORTANT)
    if (process.env.NODE_ENV === "development") {
      courses = await searchCourses("Web Development");
      return res.status(200).json(courses);
    }

    // 3️⃣ AI FALLBACK
    const prompt = `
  You are an intelligent assistant for an LMS platform. A user will type any query about what they want to
  learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:
  - App Development 
  - AI/ML 
  - AI Tools 
  - Data Science 
  - Data Analytics 
  - Ethical Hacking 
  - UI UX Designing 
  - Web Development 
  - Others 
  - Beginner 
  - Intermediate 
  - Advanced Only reply with one
  single keyword from the list above that best matches the query. Do not explain anything. No extra text. Query: ${input}`

    let keyword = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      keyword = response?.content?.[0]?.text?.trim();
    } catch (err) {
      if (err.status === 429) {
        return res.status(429).json({
          message: "AI quota exceeded. Please try again later."
        });
      }
      throw err;
    }

    // 4️⃣ AI-based search
    courses = await searchCourses(keyword);
    return res.status(200).json(courses);

  } catch (error) {
    console.error("searchWithAi error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
