import express, { type Request, type Response } from "express";
import rateLimit from "express-rate-limit";
import { Route_webhook } from "./Routes/Route_webhook.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// axios for webhook trial
import axios from "axios";
import { time, timeStamp } from "console";
import { testingEndpoint } from "./Controllers/svixTesting/testing.js";
// mongoose.connect(process.env.DATABASE_STRING)

const app = express().use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.

app.use(limiter);

app.use("/chatBot/v1/webhook", Route_webhook);

app.use("/central", testingEndpoint);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server running succesfully on port", PORT);
});
