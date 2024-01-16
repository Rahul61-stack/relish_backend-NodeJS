const utility = require("./utility");

const mongoose = require("mongoose");
require('dotenv').config()

const db_user = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const url = process.env.URL
const db_name = process.env.DB

//FUNCTION TO CONNECT TO THE MONGODB
async function ConnectToMongoDB() {

  const connectionString = utility.GenerateMongoString(
    db_user,db_password,url,db_name
  );
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
