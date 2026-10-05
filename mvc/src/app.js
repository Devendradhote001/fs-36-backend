const express = require("express");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

module.exports = app;
