require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const cacheInstance = require("./src/config/redis");

connectDB();

cacheInstance.on("connect", () => {
  console.log("redis connected");
});

cacheInstance.on("error", (err) => {
  console.log("error in redis", err);
});

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
