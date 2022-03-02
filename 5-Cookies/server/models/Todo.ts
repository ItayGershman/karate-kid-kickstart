import { Schema, model } from "mongoose";

export interface ITodo {
  text: string;
  isFinished: boolean;
  id: string;
  user_id: string;
}

export const todoSchema = new Schema<ITodo>({
  text: String,
  isFinished: Boolean,
  id: String,
  user_id: String,
});

module.exports = model<ITodo>("todos", todoSchema);
