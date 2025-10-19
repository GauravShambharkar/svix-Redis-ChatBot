import { type Request, type Response } from "express";
import { createClient } from "redis";

export const readChatController = async (req: Request, res: Response) => {
  
  const chatCache = createClient();

  const chatExist = await chatCache.get("chats");

  if (chatExist) {
  }

  res.send({
    payload: "payload will be here",
  });
};
