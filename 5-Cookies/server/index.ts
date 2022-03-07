import { MongoDBService } from "./services/MongoDBSerivce";

const {myApp} = require("./app");
const db = new MongoDBService();
db.connect();
myApp(db,3000).start();
