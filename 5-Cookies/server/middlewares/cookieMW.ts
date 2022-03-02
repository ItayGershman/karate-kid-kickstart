import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { user_id } from "../constants";

export const addCookie = (req: Request, res: Response, next: NextFunction) => {
  let cookieToken: string = req.cookies[user_id];
  if (cookieToken) {
    req.body[user_id] = req.cookies[user_id];
  } else {
    cookieToken = uuidv4();
    res.cookie(user_id, cookieToken);
  }
  req.body.user_id = cookieToken;
  next();
};
