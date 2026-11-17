const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cacheInstance = require("../config/redis");

const registerController = async (req, res) => {
  try {
    // 1 take user data from frontend
    let { name, email, password, mobile } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    // 2. is existed user
    let isExisted = await UserModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });

    // 3. hash password
    let hashPass = bcrypt.hashSync(password, 10);

    // 4. create/save user in db
    let user = await UserModel.create({
      name,
      email,
      password: hashPass,
      mobile,
    });

    // 5. create token
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // 6. store in cookies
    res.cookie("token", token);

    // 7. send response
    return res.status(201).json({
      success: true,
      message: "User registered",
      data: user,
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
};

const loginController = async (req, res) => {
  try {
    // 1. receive email and password
    let { email, password } = req.body;

    if (!email || !password) throw new Error("Email and pass is required");

    // 2. check user exists or not
    let isExisted = await UserModel.findOne({ email });

    if (!isExisted)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    // 3. check password
    let comparePass = bcrypt.compareSync(password, isExisted.password);

    if (!comparePass)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });

    // 4. generate token
    let token = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30min",
    });

    // 5. save in cookies
    res.cookie("token", token);

    // 6. send response
    return res.status(200).json({
      success: true,
      message: "User loggedIn",
      data: isExisted,
    });
  } catch (error) {
    throw new Error("Internal server error");
  }
};

const logoutController = async (req, res) => {
  try {
    let token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        message: "unauthorized request",
        success: false,
      });

    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let restTime = Math.floor(decode.exp - Date.now() / 1000);

    await cacheInstance.set(token, "blacklisted", "EX", restTime);

    res.clearCookie("token");

    return res.status(200).json({
      message: "user logged out",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
