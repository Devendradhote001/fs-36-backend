import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },
  caption: {
    type: String,
  },
  location: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "comment",
  },
});

const PostModel = mongoose.model("post", postSchema);
