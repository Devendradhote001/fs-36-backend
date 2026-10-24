import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/test-image-upload");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in mongodb connection", error);
  }
};
