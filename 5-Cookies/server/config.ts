require("dotenv").config("karate-kid-kickstart/5-Cookies/server/.env")
const mongoose = require("mongoose");

const url:string = `${process.env.DB_HOST}`;
const options:object = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, options)
  .then(() => console.log(`connected`))
  .catch((err) => console.error(`connection error: ${err}`));
