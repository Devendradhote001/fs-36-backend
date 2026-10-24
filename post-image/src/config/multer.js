import multer from "multer";

let storage = multer.memoryStorage();

export const uploads = multer({ storage });
