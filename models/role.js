const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role field is mandatory"],
  },
});

module.exports = model("role", RoleSchema);
