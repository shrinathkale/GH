require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const memberSchema = new mongoose.Schema({
  name: String,
  phone: String
});

const guestSchema = new mongoose.Schema({
  memberCount: Number,
  company: String,
  purpose: String,
  from: Date,  // or Date if you prefer
  to: Date,
  roomNo: Number,
  officer: String,    // or Date if you prefer
  members: [memberSchema]
});

const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest;

const loginRoute = require('./login-back');
const insertRoute = require('./insert-data-app');
const showRoute = require('./show-data-app');
const updateRoute = require('./update-data-app');

app.use("/api", loginRoute);
app.use("/api", insertRoute);
app.use("/api", showRoute);
app.use("/api", updateRoute);

const port = process.env.PORT;

// Server start
app.listen(port, () => {
  console.log('Server running on http://localhost:3000');
});