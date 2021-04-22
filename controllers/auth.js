const { response } = require("express");
const bcrypt = require("bcryptjs");
const JWT = require('../helpers/jwt')
const User = require("../models/user");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!user.active) {
      return res.status(400).json({
        message: "Inactive user",
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = await JWT.generate(user._id);

    return res.json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An Error has ocurred",
    });
  }
};

module.exports = {
  login,
};
