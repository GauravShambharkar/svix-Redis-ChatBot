import express from "express";
import { type Request, type Response } from "express";
import { readChatController } from "../Controllers/readChatController.js";
import { gemini } from "../Controllers/gemini.js";

const Route_webhook = express.Router();

Route_webhook.get("/readChat", readChatController);

Route_webhook.post("/newChat", gemini);

export { Route_webhook };
