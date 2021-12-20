"use strict";

const axios = require("axios");

async async function handleGetData(req, res) {
const url = `https://disease.sh/v3/covid-19/all`
const resultData = await axios.get(url)

const responseData = resultData.data;
res.status(200).send(responseData)
}