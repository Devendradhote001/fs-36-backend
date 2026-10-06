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
    required: true,
    minlength: 8,
  },
  mobile: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
