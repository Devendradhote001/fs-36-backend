import { sendFiles } from "../config/imagekit.js";
import PostModel from "../models/post.model.js";

export const createPostController = async (req, res) => {
  try {
    let { caption, location } = req.body;

    let user = req.user;

    let media = req.files;

    if (!media)
      return res.status(400).json({
        message: "At least one file is required",
        success: false,
      });

    let uplaodedImgs = await Promise.all(
      media.map(async (val) => {
        return await sendFiles(val.buffer, val.originalname);
      })
    );

    console.log("upload", uplaodedImgs);

    let newPost = await PostModel.create({
      user_id: user._id,
      caption,
      location,
      images: uplaodedImgs.map((val) => val.url),
    });

    user.posts.push(newPost._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Post created",
      data: newPost,
    });
  } catch (error) {
    console.log("post api", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    let postId = req.params.postId;

    let { caption, location } = req.body;

    let user = req.user;

    let media = req.files;
    let uplaodedImgs = null;

    if (media) {
      uplaodedImgs = await Promise.all(
        media.map(async (val) => {
          return await sendFiles(val.buffer, val.originalname);
        })
      );
    }

    // let post = await PostModel.findById(postId);

    // let newPost = await PostModel.findByIdAndUpdate(postId, {
    //   user_id: user._id,
    //   caption,
    //   location,
    //   images: uplaodedImgs ? uplaodedImgs.map((val) => val.url) : post.images,
    // });
    let updatedPost = null;

    if (uplaodedImgs) {
      updatedPost = await PostModel.findByIdAndUpdate(postId, {
        user_id: user._id,
        caption,
        location,
        images: uplaodedImgs.map((val) => val.url),
      });
    } else {
      updatedPost = await PostModel.findByIdAndUpdate(postId, {
        user_id: user._id,
        caption,
        location,
      });
    }

    user.posts.push(newPost._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Post created",
      data: newPost,
    });
  } catch (error) {
    console.log("post api", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
