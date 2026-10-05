const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
});

let UserModel = mongoose.model("users", userSchema, "person");

module.exports = UserModel;
