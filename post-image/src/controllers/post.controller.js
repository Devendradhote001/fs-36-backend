import { sendFiles } from "../config/imagekit.js";
import PostModel from "../models/post.model.js";

export const createPostController = async (req, res) => {
  try {
    let { title, location } = req.body;

    let media = req.files;
    // for single
    // let uploadedImage = await sendFiles(media.buffer, media.originalname);

    // for multiple
    let uploadedImages = await Promise.all(
      media.map(async (val) => await sendFiles(val.buffer, val.originalname)),
    );

    let newPost = await PostModel.create({
      title,
      location,
      images: uploadedImages.map((val) => val.url),
    });

    return res.status(201).json({
      message: "Post created",
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
