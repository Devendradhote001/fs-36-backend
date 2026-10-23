const multer = require("multer");

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

let storage = multer.memoryStorage();

const uploads = multer({
  storage,
});

module.exports = uploads;
