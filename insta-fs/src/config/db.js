import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/insta-fs");
    console.log("mongodb connected");
  } catch (error) {
    console.log("error in connecting db", error);
  }
};
