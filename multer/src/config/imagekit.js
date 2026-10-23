const Imagekit = require("imagekit");

const storage = new Imagekit({
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
  urlEndpoint: process.env.IK_URL,
});

let sendFilesToIK = async (file, fileName) => {
  return await storage.upload({
    file,
    fileName,
  });
};

module.exports = sendFilesToIK;
