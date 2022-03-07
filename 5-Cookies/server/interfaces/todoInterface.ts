import { Request, Response } from "express";
export interface ITodo {
  text: string;
  isFinished: boolean;
  id: string;
  userID: string;
}
export interface ITodoDB {
  getTodos: (userID: string) => void;
  createTodo: (todo: ITodo) => void;
  updateTodo: (todo: ITodo, id: string, options: object, cb: Function) => void;
  removeTodo: (id: string) => void;
}

export interface ITodoController {
  db: any;
  getTodos: (req: Request, res: Response) => Promise<void>;
  createTodo(req: Request, res: Response): Promise<void>;
  updateTodo(req: Request, res: Response): Promise<void>;
  deleteTodo(req: Request, res: Response): Promise<void>;
}
