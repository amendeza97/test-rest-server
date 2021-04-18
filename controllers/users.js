const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const getUsers = async (req, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const activeQuery = { active: true };

  const [total, users] = await Promise.all([
    User.countDocuments(activeQuery),
    User.find(activeQuery).skip(Number(since)).limit(Number(limit)),
  ]);

  return res.status(200).json({ total, users });
};

const putUsers = async (req, res = response) => {
  const { userId } = req.params;
  const { _id, password, google, email, ...user } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, user);

  res.status(200).json(updatedUser);
};

const postUsers = async (req, res = response) => {
  const { name, password, email, role } = req.body;
  const user = new User({ name, password, email, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.status(201).json(user);
};

const deleteUsers = async (req, res = response) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndUpdate(userId, { active: false });

  res.status(200).json(deletedUser);
};

const patchUsers = (req, res = response) => {
  res.status(200).json({
    message: "patch API - controller",
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
};
