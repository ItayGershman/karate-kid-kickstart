import { errorHandler } from "../utils/errorHandler";
import { MongoDB } from "../utils/MongoDB";

require("dotenv").config("karate-kid-kickstart/5-Cookies/server/.env");
const mongoose = require("mongoose");

export class MongoDBService extends MongoDB {
  connection;
  constructor() {
    super();
  }
  async connect() {
    try {
      const url: string = `${process.env.DB_HOST}`;
      const options: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      this.connection = mongoose
        .connect(url, options)
        .then(() => console.log(`connected`))
        .catch((err) => console.error(`connection error: ${err}`));
    } catch (error) {
      errorHandler(error)
    }
  }
  async disconnect() {
    await mongoose.connection.close();
  }
  async emptyDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
