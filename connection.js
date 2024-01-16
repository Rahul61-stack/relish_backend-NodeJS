const utility = require("./utility");

const mongoose = require("mongoose");

//FUNCTION TO CONNECT TO THE MONGODB
async function ConnectToMongoDB() {
  const values = utility.ReadValues(
    "/mongo.txt",
  );
  const connectionString = utility.GenerateMongoString(
    values[0],
    values[1],
    values[2],
    values[3],
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
