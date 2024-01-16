const utility = require("./utility");

const mongoose = require("mongoose");
require('dotenv').config()

const db_user = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const url = process.env.URL
const db_name = process.env.DB

//FUNCTION TO CONNECT TO THE MONGODB
async function ConnectToMongoDB() {
<<<<<<< HEAD
  // const values = utility.ReadValues(
  //   "/mongo.txt",
  // );
=======
  const values = utility.ReadValues(
    "/mongo.txt",
  );
>>>>>>> 0cba7bb2e0734aa606ec8f3c75d7fe4a0fb1cfa0
  const connectionString = utility.GenerateMongoString(
    db_user,db_password,url,db_name
  );
  console.log(connectionString)
  mongoose.connect(connectionString, { retryWrites: true });

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  db.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
  });
}

module.exports = { ConnectToMongoDB };
