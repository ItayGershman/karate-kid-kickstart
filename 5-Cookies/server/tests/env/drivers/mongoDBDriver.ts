import { ITodo, ITodoDB } from "../../../interfaces/todoInterface";
import { MongoMemoryServer } from "mongodb-memory-server";

import mongoose from "mongoose";
import TodoModel from "../../../models/Todo";

export class MongoDriver implements ITodoDB {
  mongoServer;
  contstrucor() {}
  async setup() {
    try {
      this.mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(this.mongoServer.getUri());
    } catch (e) {
      console.log(e);
    }
  }
  async teardown() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongoServer.stop();
  }
  async emptyDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }

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
      text, isFinished, id, userID
    }));
  };
  updateTodo = (
    todo: ITodo,
    id: string,
    options: object = {},
    cb: Function
  ) => {
    return TodoModel.findOneAndUpdate({ id:id }, { $set: todo }, options, cb());
  };
  removeTodo: (id: string) => {};
}