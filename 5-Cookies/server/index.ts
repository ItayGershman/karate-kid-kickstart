import { MongoDBService } from "./services/MongoDBSerivce";

const { myApp } = require("./app");
const db = new MongoDBService();
db.connect();
myApp(db, process.env.PORT || 3000).start();
