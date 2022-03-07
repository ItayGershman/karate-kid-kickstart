import { Request, Response } from "express";
import { ITodo, ITodoController } from "../interfaces/todoInterface";
import TodoModel from "../models/Todo";

export class TodoController implements ITodoController {
  db: any;
  constructor(db: any) {
    this.db = db;
  }
  async getTodos(req: Request, res: Response): Promise<void> {
    try {
      const userID = req.body.userID;
      const todos = await this.db.getTodos(userID);
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createTodo(req: Request, res: Response): Promise<void> {
    const userID: string = req.body.userID;
    const todo: ITodo = {
      text: req.body.text,
      isFinished: req.body.isFinished,
      id: req.body.id,
      userID,
    };
    this.db
      .createTodo(todo)
      .then((todo) => {
        console.log(todo);
        res.status(200).json(todo);
      })
      .catch((err) => res.status(500).send(`${err}`));
  }
  async updateTodo(req: Request, res: Response): Promise<void> {
    this.db
      .updateTodo(
        {
          text: req.body.data.text,
          isFinished: req.body.data.isFinished,
        },
        req.params.id,
        { new: true },
        (err, todo) => {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send("Item updated successfully");
          }
        }
      )
      .catch((e) => {
        console.log("Error");
        res.status(500).send("Internal Server Error");
      });
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
