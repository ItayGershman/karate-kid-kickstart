import express, { Application } from "express";
import cookieParser from "cookie-parser";
import router from "./router/routes";
import { addCookie } from "./middlewares/cookieMW";
require("./config.ts");

const app: Application = express();
const port: Number|string = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(addCookie);
app.use("/todos", router);

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
