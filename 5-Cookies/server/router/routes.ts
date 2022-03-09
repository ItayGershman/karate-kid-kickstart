import express, { Request, Response } from "express";
import { ITodoDB } from "../interfaces/todoInterface";
const { TodoController } = require("../controller/todoController");

export const todosRouter = (db: ITodoDB) => {
  const router = express.Router();
  const todoController = new TodoController(db);

  router.get("/", (req: Request, res: Response) => {
    todoController.getTodos(req, res);
  });

  router.post("/", (req: Request, res: Response) => {
    todoController.createTodo(req, res);
  });

  router.put("/:id", (req: Request, res: Response) => {
    todoController.updateTodo(req, res);
  });

  router.delete("/:id", (req: Request, res: Response) => {
    todoController.deleteTodo(req, res);
  });

  return router;
};
