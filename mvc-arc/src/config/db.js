const { default: mongoose } = require("mongoose");

console.log("hello");

const connectDb = async () => {
  await mongoose.connect(process.env.mongo_uri);
  console.log("mongodb connected");
};

module.exports = connectDb;
