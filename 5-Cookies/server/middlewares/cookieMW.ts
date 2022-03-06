import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { userID } from "../constants";

export const addCookie = (req: Request, res: Response, next: NextFunction) => {
  let cookieToken: string = req.cookies[userID];
  if (cookieToken) {
    req.body[userID] = req.cookies[userID];
  } else {
    cookieToken = uuidv4();
    res.cookie(userID, cookieToken);
  }
  req.body.userID = cookieToken;
  next();
};
