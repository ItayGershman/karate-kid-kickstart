import { Schema, model } from "mongoose";
import { ITodo } from "../interfaces/todoInterface";

const todoSchema = new Schema<ITodo>({
  text: String,
  isFinished: Boolean,
  id: String,
  userID: String
});

const TodoModel = model("todos", todoSchema);
export default TodoModel;
