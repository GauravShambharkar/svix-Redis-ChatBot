import express, { type Request, type Response } from "express";

// import { type Request, type Response } from "express";

import { chatRoute } from "./Routes/chatRoute.js";

import dotenv from "dotenv";

dotenv.config();

const app = express().use(express.json());

app.use("/chatBot/v1", chatRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server running succesfully");
});
