const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "full name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "Minimum 6 characters are required"],
  },
  address: {
    type: String,
    default: "nahi pata",
  },
  mobile: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
