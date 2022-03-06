require("./config.ts");
const app = require("./app")
const db = require('./services/mongodbService')
app(db).start()