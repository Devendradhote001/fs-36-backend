const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = bcrypt.hashSync(this.password, 12);
});

userSchema.methods.comparePass = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
