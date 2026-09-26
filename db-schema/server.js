const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/fs36");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in connecting db", error);
  }
};

connectDB();

const app = express();
app.use(express.json());

app.post("/create", async (req, res) => {
  try {
    let { name, email, mobile } = req.body;

    let newUser = await UserModel.create({
      name,
      email,
      mobile,
    });

    return res.json({
      data: newUser,
    });
  } catch (error) {
    console.log("error in creating user", error);
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
