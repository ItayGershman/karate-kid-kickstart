import { Request, Response } from "express";
import TodoModel from "../models/Todo";

export class TodoController {
  db: any;
  constructor(db: any) {
    this.db = db;
  }
  getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const userID = req.body.userID;
      const todos = await this.db.getTodos(userID);
      // if (err) res.status(400).send(err);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  async createTodo(req: Request, res: Response): Promise<void> {
    const userID = req.body.userID;
    const todo = {
      text: req.body.text,
      isFinished: req.body.isFinished,
      id: req.body.id,
      userID,
    };
    this.db
      .createTodo(todo)
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((err) => res.status(500).send(`${err}`));
  }
  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      TodoModel.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            text: req.body.data.text,
            isFinished: req.body.data.isFinished,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) res.status(400).send(err);
          else res.status(200).json(doc);
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      TodoModel.findOneAndDelete({ id: req.params.id }, (err) => {
        if (err) res.status(400).send(err);
        else res.status(200).send("Todo deleted successfully");
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
