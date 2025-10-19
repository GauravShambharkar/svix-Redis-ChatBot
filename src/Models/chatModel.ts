import mongoose from "mongoose";
import { chatSchema } from "./Schema/chatSchema.js";

const chatModel = mongoose.model("chatBot", chatSchema);

export { chatModel };
