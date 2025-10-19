import express from "express";
import { type Request, type Response } from "express";
import { readChatController } from "../Controllers/readChatController.js";

const chatRoute = express.Router();

chatRoute.get("/readChat", readChatController);

export { chatRoute };
