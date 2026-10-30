import UserModel from "../models/user.model.js";

export const getUserProfileController = async () => {
  try {
    let user = UserModel.findById(req.user._id).select(
      "-password -refreshToken",
    );

    return res.status(200).json({
      success: true,
      message: "User profile fetched",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// export const functionn = async () => {
//   try {
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// export const functionn = async () => {
//   try {
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// export const functionn = async () => {
//   try {
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// export const functionn = async () => {
//   try {
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };
