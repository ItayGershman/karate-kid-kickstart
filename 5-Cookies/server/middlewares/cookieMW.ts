import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";

export const addCookie: RequestHandler = (req, res, next) => {
  let cookieToken: string = req.cookies.userID;
  if (!cookieToken) {
    cookieToken = uuidv4();
    res.cookie("userID", cookieToken);
  }
  req.body.userID = cookieToken;
  next();
};
