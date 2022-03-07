import express from "express";
import cookieParser from "cookie-parser";

import { addCookie } from "./middlewares/cookieMW";
import { todoRouter } from "./router/routes";
import { ITodoDB } from "./interfaces/todoInterface";

export const myApp = (db: ITodoDB, port: Number | String) => {
  const app = express();

  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.use(express.static("public"));
  app.use(cookieParser());

  app.use(addCookie);
  app.use("/todos", todoRouter(db));

  return {
    start: () =>
      app.listen(port, () => {
        console.log(`Todo app listening on port ${port}`);
      }),
  };
};
