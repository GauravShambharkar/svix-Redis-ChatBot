import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  payload: String,
  userId: String,
});

export { chatSchema };
