"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());



app.get("/test", (request, response) => {
  response.send("test request received");
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
