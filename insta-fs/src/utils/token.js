import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export let generateToken = (user_id, secret, time) => {
  return jwt.sign({ id: user_id }, secret, {
    expiresIn: time,
  });
};
