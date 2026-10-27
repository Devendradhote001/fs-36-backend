import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import { connectDb } from "./src/config/db.js";

connectDb();

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
