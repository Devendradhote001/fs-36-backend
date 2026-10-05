const UserModel = require("../models/user.model");

const createUserController = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "Required fields",
      });

    let newUser = await UserModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getSingleUserController = async (req, res) => {
  try {
    let { id } = req.params;

    let user = await UserModel.findById(id);

    return res.status(200).json({
      message: "User fetched",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createUserController,
  getSingleUserController,
};
