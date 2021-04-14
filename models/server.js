const express = require("express");
const cors = require("cors");

const userRoutes = require("../routes/users");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // * middlewares section
    this.middlewares();
    // * routes
    this.routes();
  }

  middlewares() {
    // parse and read of request body
    this.app.use(express.json());
    // public directory
    this.app.use(express.static("public"));
    // cors
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api/users/", userRoutes);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server listening in port ${this.port}`)
    );
  }
}

module.exports = Server;
