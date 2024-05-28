const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/brainInventory");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;