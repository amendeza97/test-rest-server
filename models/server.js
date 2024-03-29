const express = require("express");
const cors = require("cors");

const { dbConnection } = require('../db/config')
const userRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // * connect db
    this.connectDB();
    // * middlewares section
    this.middlewares();
    // * routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/users", userRoutes);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server listening in port ${this.port}`)
    );
  }
}

module.exports = Server;
