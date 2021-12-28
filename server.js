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
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected')
});
mongoose.connect(process.env.DB_URL)


app.use(cors());
app.use(express.json());
app.get("/covidData", covidData);
app.get("/currentData", getCurrentData);
app.get('/mongoData', getMongoData)
app.get("/test", (request, response) => {
  response.send("test request received");
});
app.get("/", handleGetUser);

app.post('/data', handleNewData);
app.delete('/mongoData/:id', handleDelete)

function handleGetUser(req, res) {

  verifyUser(req, async (err, user) => {
    // let authUser = {}
    if (req.query.email) {
      authUser = (req.query.email === user.email)
    }
    let pleasework = {}
    if (err) {
      console.error(err)
      res.send("Invalid Token");
    } else {
      try {
        const dataDB = await Data.find(pleasework);
        if (dataDB.length > 0) {
          res.status(200).send(dataDB);
        } else {
          res.status(404).send('oops');
        }
      } catch (e) {
        console.error(e);
        res.status(500).send('Server Error');
      }
    }
    getMongoData();
    console.log(getMongoData());
  });
}

async function handleDelete(req, res) {
  const { id } = req.params;
  // console.log('id' + id)
  
  const { email } = req.query;
  // console.log('email ' + email);
  try {
    const data = await Data.findOne({ _id: id, email: email });

    
    if (!data) res.status(400).send("Could not delete data");
    else {
      await Book.findByIdAndDelete(id);
      res.status(200).send("delete success");
    }
  } catch (e) {
    console.error(e);
    console.log(e.message)
    res.status(500).send("cannot delete. server error");
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


  function handleGetUser(req, res) {
    verifyUser(req, (err, user) => {
      if (err) {
        res.send("Invalid Token");
      } else {
        res.send(user);
      }
    });
  }
}

async function getMongoData(req, res) {
  let emailFromClient = {}
  console.log(emailFromClient)
  if (req.query.email) {
    emailFromClient.email = req.query.email
  }
  try {
    const data = await Data.find(emailFromClient)
    if (data.length > 0) {
      res.status(200).send(data);
      console.log(data);
    } else {
      res.status(404).send('nothing found');
    }
  } catch (e) {
    res.status(500)
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

