import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// gemini secret api key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// main function
const gemini = async (req: Request, res: Response) => {
  const { newMsg } = req.body;
  if (!GEMINI_API_KEY) {
    res.status(500).send({
      err: "Missing GEMINI_API_KEY in environment variables",
    });
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  }

  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  const geminiResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: newMsg,
  });


  res.send({
    geminiResponse: geminiResponse.text,
  });
};

export { gemini };
