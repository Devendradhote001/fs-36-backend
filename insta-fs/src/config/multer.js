import multer from "multer";

const storage = multer.memoryStorage();

export const uplaods = multer({ storage });
