import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const gemini = async (req: Request, res: Response) => {
  const { newMsg } = req.body;


  if (!GEMINI_API_KEY) {
    return res.status(500).send({
      err: "Missing GEMINI_API_KEY in environment variables",
    });
  }

  // Connect Redis
  const redisClient = createClient();
  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();

  const redisKey = `chat: ${newMsg}`;

  const cachedChat = await redisClient.get(redisKey);
  if (cachedChat) {
    return res.send({
      cachedChat: true,
      geminiResponse: cachedChat,
    });
  }

  // non cached response
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const geminiResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: newMsg,
  });

  if (!geminiResponse.text) {
    return res.status(500).send({
      err: "Gemini response text is undefined",
    });
  }

  const cleanText = geminiResponse.text.replace(/\n+/g, " ").trim();

  await redisClient.set(redisKey, cleanText, { EX: 3600 }); // expires in 1 hour

  return res.send({
    cachedChat: false,
    geminiResponse: cleanText,
  });
};

export { gemini };
