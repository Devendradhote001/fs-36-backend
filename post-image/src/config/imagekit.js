import Imagekit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const storageInstance = new Imagekit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL,
});

export const sendFiles = async (file, fileName) => {
  return await storageInstance.upload({
    file,
    fileName,
  });
};
