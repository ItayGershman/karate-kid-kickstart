import { Request, Response } from "express";
const Todo = require("../models/Todo");


exports.todoController = {
  async getTodos(req: Request, res: Response): Promise<void> {
    try {
      Todo.find({ user_id: req.body.user_id }, (err, todos) => {
        if (err) res.status(400).send(err);
        else res.status(200).json(todos);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  async createTodo(req: Request, res: Response): Promise<void> {
    try {
      const todo = new Todo({
        text: req.body.text,
        isFinished: req.body.isFinished,
        id: req.body.id,
        user_id: req.body.user_id,
      });
      await todo.save((err) => {
        if (err) {
          res.status(500).send(`${err}`);
        } else {
          res.status(200).json(todo);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  async updateTodo(req: Request, res: Response): Promise<void> {
    try {
      Todo.findOneAndUpdate(
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
  },
  async deleteTodo(req: Request, res: Response): Promise<void> {
    try {
      Todo.findOneAndDelete({ id: req.params.id }, (err) => {
        if (err) res.status(400).send(err);
        else res.status(200).send("Todo deleted successfully");
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
