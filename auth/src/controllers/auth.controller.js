const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cacheInstance = require("../config/redis");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const sendMailToUser = require("../config/mail");

const registerController = asyncHandler(async (req, res) => {
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
});

const loginController = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });

    let isExists = await UserModel.findOne({ email });

    if (!isExists)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    let checkPass = isExists.comparePass(password);

    if (!checkPass)
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });

    let accessToken = jwt.sign(
      { id: isExists._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    return res.status(201).json({
      message: "user Logged in",
      success: true,
      data: isExists,
    });
  } catch (error) {
    console.log("error in reg", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

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

const forgetPasswordController = asyncHandler(async (req, res) => {
  let email = req.body.email;

  if (!email) throw new ApiError("email is required", 400);

  let isValidUser = await UserModel.findOne({ email });

  if (!isValidUser) throw new ApiError("User not found", 404);

  let resetToken = jwt.sign(
    { id: isValidUser._id },
    process.env.JWT_SECRET_KEY_TEMP,
    {
      expiresIn: "5m",
    },
  );

  let resetLink = `http://localhost:3000/api/auth/reset-password/${resetToken}`;

  await sendMailToUser(email, "Reset your password", resetLink);

  return res.status(200).json({
    success: true,
    message: "Link sent to email",
  });
});

const resetPasswordController = asyncHandler(async (req, res) => {
  let token = req.params.token;

  let decode = jwt.verify(token, process.env.JWT_SECRET_KEY_TEMP);

  if (!decode) throw new ApiError("unauthorized request", 401);

  let user = await UserModel.findById(decode.id);

  return res.render("resetPassword.ejs", { id: user._id });
});

const updatePasswordController = asyncHandler(async (req, res) => {
  let password = req.body.password;
  let userId = req.params.user_id;

  if (!password) throw new ApiError("password is required", 400);

  let user = await UserModel.findById(userId);

  user.password = password;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
    data: user,
  });
});


module.exports = {
  registerController,
  loginController,
  logoutController,
  forgetPasswordController,
  resetPasswordController,
  updatePasswordController,
};

// null, undefined, false, "", 0 -0 document.all nan
