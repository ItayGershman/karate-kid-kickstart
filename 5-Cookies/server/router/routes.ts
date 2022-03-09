import express, { Request, Response } from "express";
const { TodoController } = require("../controller/todoController");

export const todosRouter = (db: any) => {
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
