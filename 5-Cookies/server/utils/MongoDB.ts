import { ITodo, ITodoDB } from "../interfaces/todoInterface";
import TodoModel from "../models/Todo";
import { errorHandler } from "./errorHandler";

export class MongoDB implements ITodoDB {
  constructor() {}
  getTodos = async (userID) => {
    try {
      const todos = await TodoModel.find({ userID: userID });
      return todos;
    } catch (error) {
      errorHandler(error);
    }
  };
  createTodo = (todo: ITodo) => {
    const res = new TodoModel(todo).save();
    return res.then(({ text, isFinished, id, userID }: ITodo) => ({
      text,
      isFinished,
      id,
      userID,
    }));
  };
  updateTodo = async (
    todo: Partial<ITodo>,
    id: string,
    options: object = {}
  ) => {
    return await TodoModel.findOneAndUpdate(
      { id: id },
      { $set: todo },
      options
    );
  };
  removeTodo = async (id: string) => {
    return await TodoModel.findOneAndDelete({ id: id });
  };
}
