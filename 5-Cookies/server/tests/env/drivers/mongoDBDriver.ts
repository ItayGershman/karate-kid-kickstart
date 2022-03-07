import { MongoMemoryServer } from "mongodb-memory-server";

import mongoose from "mongoose";
import { MongoDB } from "../../../utils/MongoDB";

export class MongoDriver extends MongoDB {
  mongoServer;
  contstrucor() {}
  async setup() {
    try {
      this.mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(this.mongoServer.getUri());
    } catch (e) {
      console.log(e);
    }
  }
  async teardown() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await this.mongoServer.stop();
  }
  async emptyDB() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
}
