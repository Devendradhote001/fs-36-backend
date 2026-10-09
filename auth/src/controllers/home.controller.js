const getHomeDataController = (req, res) => {
  try {
    return res.status(200).json({
      message: "Ye hai main page",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getHomeDataController,
};
