import { myApp } from "../app";
import { AppDriver } from "./env/drivers/appDriver";
import http from "http";
import { MongoDriver } from "./env/drivers/mongoDBDriver";

export class TestKit {
  private server: http.Server;
  public appDriver;
  private mongoDBDriver;
  constructor() {}
  async setup() {
    const port = Math.ceil((Math.random() * 10000 + 1000))
    this.appDriver = new AppDriver(`http://localhost:${port}`);
    
    this.mongoDBDriver = new MongoDriver();

    const app = myApp(this.mongoDBDriver, port);

    this.server = app.start();
    await this.mongoDBDriver.setup();
  }
  teardown() {
    this.server.close();
  }
  drivers() {
    return { appDriver: this.appDriver, mongoDBDriver: this.mongoDBDriver };
  }
}
