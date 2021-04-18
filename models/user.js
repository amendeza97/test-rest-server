const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
  role: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function() {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model('User', UserSchema);
