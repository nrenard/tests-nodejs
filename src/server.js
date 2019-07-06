require("./config/env");

const express = require("express");
const morgan = require("morgan");

class Server {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV === "development";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(morgan(this.isDev ? "dev" : "common"));
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new Server().express;
