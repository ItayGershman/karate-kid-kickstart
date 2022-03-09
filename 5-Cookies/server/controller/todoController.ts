import { Request, Response } from "express";
import { ITodoController, ITodoDB } from "../interfaces/todoInterface";
import { ITodo } from "../../common/interfaces/Todo";
import { errorMessages } from "../../common/errorMessages";

export class TodoController implements ITodoController {
  constructor(private db: ITodoDB) {}
  getTodos(req: Request, res: Response): void {
    const userID: string = req.body.userID;
    this.db.getTodos(userID).then((todos: ITodo[]) => {
      res.status(200).json(todos);
    });
  }

  createTodo(req: Request, res: Response): void {
    const todo: ITodo = req.body;
    this.db.createTodo(todo).then((todo) => {
      res.status(200).json(todo);
    });
  }
  updateTodo(req: Request, res: Response): void {
    const { text, isFinished }: Partial<ITodo> = req.body.data;
    this.db
      .updateTodo({ text, isFinished }, req.params.id, { new: true })
      .then((doc) => {
        if (!doc)
          res.status(400).send(errorMessages.statusCode400.updateItemMsg);
        else res.status(200).send(doc);
      });
  }
  deleteTodo(req: Request, res: Response): void {
    this.db.removeTodo(req.params.id).then((doc) => {
      if (!doc) res.status(400).send(errorMessages.statusCode400.deleteItemMsg);
      else res.status(200).send(doc);
    });
  }
}
