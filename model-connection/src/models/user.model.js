import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
  },
  posts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "post",
  },
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
