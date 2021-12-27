"use strict";

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const covidData = require("./covidData");
const getCurrentData = require("./getCurrentData");
const verifyUser = require("./auth.js");

require("dotenv").config();

const PORT = process.env.PORT || 3004;

const app = express();
app.use(cors());
app.use(express.json());
app.get("/covidData", covidData);
app.get("/currentData", getCurrentData);
app.get("/test", (request, response) => {
  response.send("test request received");
});
app.get("/", handleGetUser);

function handleGetUser(req, res) {
  verifyUser(req, (err, user) => {
    if (err) {
      res.send("Invalid Token");
    } else {
      res.send(user);
    }
  });
}
app.listen(PORT, () => console.log(`listening on ${PORT}`));
