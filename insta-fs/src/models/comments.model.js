import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CommentModel = mongoose.model("comment", commentSchema);
export default CommentModel;
