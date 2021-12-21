"use strict";

const axios = require("axios");

async function handleGetData(req, res) {

  try {
    const url = `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=98118&daysInPast=7`;
    const resultData = await axios.get(url);

    const responseData = resultData.data;
    console.log(resultData.data.counties[0].historicData)
    //returns "date", "deathCt", "positiveCt"
    res.status(200).send(responseData);

  } catch (e) {
    res.status(500).send('Server Error')
  }
}







module.exports = handleGetData;


