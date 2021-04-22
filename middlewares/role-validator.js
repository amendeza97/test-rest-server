const { response } = require("express");

const validateAdminRole = (req, res = response, next) => {
  const { user } = req;

  if (!user) {
    return res.status(500).json({
      message: "Role not verified",
    });
  }

  if (user.role !== "ADMIN_ROLE") {
    return res.status(401).json({
      message: "User is not admin",
    });
  }

  next();
};

const validateRole = (...roles) => {
  return (req, res = response, next) => {
    const { user } = req;
    if (!roles.includes(user.role)) {
      return res.status(401).json({
        message: "User unauthorized",
      });
    }
    next();
  };
};

module.exports = {
  validateAdminRole,
  validateRole,
};
