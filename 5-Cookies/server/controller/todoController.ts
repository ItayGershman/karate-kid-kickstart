import { Request, Response } from "express";
import { ITodo, ITodoController } from "../interfaces/todoInterface";

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
        res.status(200).json(todo);
      })
      .catch((err) => res.status(500).send(`${err}`));
  }
  async updateTodo(req: Request, res: Response): Promise<void> {
    const { text, isFinished } = req.body.data;
    this.db
      .updateTodo({ text, isFinished }, req.params.id, { new: true })
      .then((doc) => {
        if (!doc) res.status(400).send("Error");
        else res.status(200).send(doc);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      this.db
        .removeTodo(req.params.id)
        .then((doc) => {
          if (!doc) res.status(400).send("Error");
          else res.status(200).send(doc);
        })
        .catch((e) => {
          res.status(500).send(e);
        });
      // TodoModel.findOneAndDelete({ id: req.params.id }, (err) => {
      //   if (err) res.status(400).send(err);
      //   else res.status(200).send("Todo deleted successfully");
      // });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}
