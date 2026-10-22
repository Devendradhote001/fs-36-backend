const createPostController = async (req, res) => {
  try {
    let media = req.file;
    console.log("in req.file->", media);

    return res.send("media");
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = createPostController;
