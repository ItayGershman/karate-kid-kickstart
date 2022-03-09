import { Request, Response } from "express";
import { ITodo } from "../../common/interfaces/Todo";

export interface ITodoDB {
  getTodos: (userID: string) => Promise<ITodo[]>;
  createTodo: (todo: ITodo) => Promise<ITodo>;
  updateTodo: (todo: Partial<ITodo>, id: string, options: object) => Promise<ITodo>;
  removeTodo: (id: string) => Promise<ITodo>;
}

export interface ITodoController {
  getTodos: (req: Request, res: Response) => void;
  createTodo(req: Request, res: Response): void;
  updateTodo(req: Request, res: Response): void;
  deleteTodo(req: Request, res: Response): void;
}
