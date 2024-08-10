const mongoose = require("mongoose");
require("dotenv").config();

async function connectDb() {
  try {
    mongoose
      .connect(
        "mongodb+srv://muhammadalishuhratjonov50:KVQH5gGIsbk4WuBN@cluster0.fbfyrbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("Connected..."))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDb;
