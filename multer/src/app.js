const express = require("express");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/post", postRoutes);

module.exports = app;
