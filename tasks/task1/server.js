const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

(async () => {
  await mongoose.connect("mongodb://0.0.0.0/task1");
  console.log("mongodb connected");
})();

app.use(express.json());

const postSchema = new mongoose.Schema({
  title: String,
  userId: String,
  caption: String,
  images: [String],
  likes: Number,
  comments: [String],
  location: String,
  tags: [String],
  reachCount: Number,
});

const PostModel = mongoose.model("posts", postSchema);

app.post("/create", async (req, res) => {
  //   let { title, userId, caption, likes, location, reachCount } = req.body;

  let post = await PostModel.create(req.body);

  return res.status(201).json({
    success: true,
    message: "ban gayi",
    data: post,
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
