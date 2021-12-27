"use strict";

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const covidData = require("./covidData");
const getCurrentData = require('./getCurrentData')
const mongoose = require('mongoose')
const verifyUser = require("./auth.js");
const Data = require("./models/dataModel")

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

const db = mongoose.connection;
db.on('error' , console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose is connected')
});
mongoose.connect(process.env.DB_URL)
app.use(cors());
app.use(express.json());
app.get("/covidData", covidData);
app.get('/currentData', getCurrentData);
app.get("/test", (request, response) => {
  response.send("test request received");
});
app.get("/", handleGetUser);
app.post('/data', handleNewData);
app.delete('/data/:id', handleDelete)

function handleGetUser(req, res) {
  verifyUser(req, (err, user) => {
    if (err) {
      res.send("Invalid Token");
    } else {
      res.send(user);
    }
  });
}

async function handleDelete(req, res) {

  const { id } = req.params;
  const { email } = req.query;
  try {
    const data = await Data.findOne({ _id: id, email: user.email });
    if (!data) res.status(400).send("Could not delete data");
    else {
      await Book.findByIdAndDelete(id);
      res.status(200).send("delete success");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("server error");
  }
}

async function handleNewData(req, res) {
  // console.log(req.body);

  const { email } = req.query;
  try {
    const newData = await Data.create({ ...req.body, email });
    res.status(200).send(newData);
  } catch (e) {
    res.status(500).send("Server Error, try again");
  }
}
app.listen(PORT, () => console.log(`listening on ${PORT}`));
