import express from "express";
import { type Request, type Response } from "express";
import { readChatController } from "../Controllers/readChatController.js";
import { gemini } from "../Controllers/gemini.js";

const webhook = express.Router();

webhook.get("/readChat", readChatController);
webhook.post("/newChat", gemini);

export { webhook };
