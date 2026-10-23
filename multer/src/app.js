const express = require("express");
const cors = require("cors");
const path = require("path");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use("/api/post", postRoutes);

module.exports = app;
