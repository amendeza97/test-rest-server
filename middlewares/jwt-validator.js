const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validate = async (req = request, res = response, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({
      message: "Missing token",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(uid);
    if (!user || !user.active) {
      return res.status(401).json({
        message: "Token invalid",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = { validate };
