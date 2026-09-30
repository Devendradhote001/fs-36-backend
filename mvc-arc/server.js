require("dotenv").config();
const app = require("./src/app");
const connectDb = require("./src/config/db");

connectDb();
let port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
