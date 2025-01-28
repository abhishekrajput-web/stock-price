import mongoose from "mongoose";

const databaseConnection = async (url) => {
    mongoose
      .connect(url)
      .then(function () {
        console.log("mongodb connected successfully");
      })
      .catch(function (err) {
        console.log(err || "mongodb not connected...");
      });
  }

  export default databaseConnection;
