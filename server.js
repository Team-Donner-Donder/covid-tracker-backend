"use strict";

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const covidData = require("./covidData");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.get("/covidData", covidData);
app.get("/test", (request, response) => {
  response.send("test request received");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
