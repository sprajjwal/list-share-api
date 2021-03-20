const username = process.env.USERNAME;
const password = process.env.PASSWORD; 
const dbname = process.env.DBNAME;

const url = `mongodb://${username}:${password}@mongo.shaash.dev:27017/${dbname}`
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  url, {
    authSource: "admin",
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set('debug', true);

module.exports = mongoose.connection;