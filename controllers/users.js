const { response } = require("express");

const getUsers = (req, res = response) => {
  const { name } = req.query;
  res.status(200).json({
    message: "get API - controller",
    name,
  });
};

const putUsers = (req, res = response) => {
  const { userId } = req.params;
  res.status(200).json({
    message: "put API - controller",
    userId,
  });
};

const postUsers = (req, res = response) => {
  const { body } = req;
  res.status(201).json({
    message: "post API - controller",
    body,
  });
};

const deleteUsers = (req, res = response) => {
  res.status(403).json({
    message: "delete API - controller",
  });
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
