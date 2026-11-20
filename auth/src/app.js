const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const homeRoutes = require("./routes/home.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/greet", (req, res) => {
  res.send("holaa amigo");
});

app.use(express.json());

// middleware for reading formData
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

app.use(errorMiddleware);

module.exports = app;
