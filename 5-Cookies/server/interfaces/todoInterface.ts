import { Request, Response } from "express";
export interface ITodo {
  text: string;
  isFinished: boolean;
  id: string;
  userID: string;
}
export interface ITodoDB {
  getTodos: (userID: string) => Promise<ITodo[]>;
  createTodo: (todo: ITodo) => Promise<ITodo>;
  updateTodo: (todo: Partial<ITodo>, id: string, options: object) => Promise<ITodo>;
  removeTodo: (id: string) => Promise<ITodo>;
}

export interface ITodoController {
  db: any;
  getTodos: (req: Request, res: Response) => Promise<void>;
  createTodo(req: Request, res: Response): Promise<void>;
  updateTodo(req: Request, res: Response): Promise<void>;
  deleteTodo(req: Request, res: Response): Promise<void>;
}
