const sendFilesToIK = require("../config/imagekit");

const createPostController = async (req, res) => {
  try {
    let media = req.file;
    console.log("in req.file->", media);

    let uploadedImages = await sendFilesToIK(media.buffer, media.originalname);

    console.log(uploadedImages);
    return res.send("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = createPostController;
