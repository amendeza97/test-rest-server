const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
  const isRegisteredRole = await Role.findOne({ role });
  if (!isRegisteredRole) {
    throw new Error("Invalid role");
  }
};

const isEmailRegistered = async (email = null) => {
  if (!email) throw new Error("Invalid Email");
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    throw new Error("Email already registred");
  }
};

const isUserExistingById = async (id) => {
    const isRegistered = await User.findById(id);
    if (!isRegistered) {
      throw new Error("User not found");
    }
  };

module.exports = {
  isValidRole,
  isEmailRegistered,
  isUserExistingById,
};
