const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.mongoURL);
    console.log("Connected to the database");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
