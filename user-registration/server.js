const express = require("express");
const connectDB = require("./config/db");
const UserModel = require("./models/user.model");

connectDB();
const app = express();

app.use(express.json());

// api

app.post("/register", async (req, res) => {
  try {
    let { fullName, email, password, mobile, address } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let newUser = await UserModel.create({
      fullName,
      email,
      password,
      address,
      mobile,
    });

    return res.status(201).json({
      success: true,
      message: "User registered",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
