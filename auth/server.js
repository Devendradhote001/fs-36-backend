require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
