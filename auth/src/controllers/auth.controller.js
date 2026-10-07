const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    // 1 take user data from frontend
    let { name, email, password, mobile } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    // 2 check weather user exists or not
    // let isExisted = await UserModel.findOne({ email });

    // if (isExisted) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "User already exist",
    //   });
    // }

    // 3. Hash the password
    let hashPass = await bcrypt.hash(password, 10);

    // 4. create the user in db
    let user = await UserModel.create({
      name,
      email,
      password: hashPass,
      mobile,
    });

    // 5. generate jwt
    let token = jwt.sign({ id: user._id }, "dsfvjsdgfjsdgvfdsjfvsdjmv", {
      expiresIn: "1h",
    });

    // 6. save token in cookie
    res.cookie("tala", token);

    // 7. return res to user
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
};
