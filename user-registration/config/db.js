const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0/user-reg");
    console.log("db connected");
  } catch (error) {
    console.log("error in connecting db", error);
  }
};

module.exports = connectDB;
