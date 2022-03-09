import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorHandler } from "../utils/errorHandler";
import { MongoDB } from "../utils/MongoDB";

dotenv.config();

export class MongoDBService extends MongoDB {
  async connect() {
    try {
      const url: string = `${process.env.DB_HOST}`;
      const options: object = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      mongoose
        .connect(url, options)
        .catch((err) => console.error(`connection error: ${err}`));
    } catch (error) {
      errorHandler(error);
    }
  }
  disconnect() {
    return mongoose.connection.close();
  }
  async emptyDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
