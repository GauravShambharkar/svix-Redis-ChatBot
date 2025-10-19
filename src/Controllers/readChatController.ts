import { type Request, type Response } from "express";

export const readChatController = (req: Request, res: Response) => {
  res.send({
    payload: "payload will be here",
  });
};
