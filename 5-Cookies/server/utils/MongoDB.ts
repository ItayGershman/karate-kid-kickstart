import { ITodo, ITodoDB } from "../interfaces/todoInterface";
import TodoModel from "../models/Todo";

export class MongoDB implements ITodoDB {
  constructor(){}
  getTodos = async (userID) => {
    try {
      const todos = await TodoModel.find({ userID: userID });
      return todos;
    } catch (error) {
      console.log(error);
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
  updateTodo = async (todo: ITodo, id: string, options: object = {}) => {
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
