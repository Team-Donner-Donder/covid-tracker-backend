"use strict";

const axios = require("axios");

async function handleGetData(req, res) {
  let zipcode = req.query.zipcode
  let date = req.query.date
  try {
    const url = `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipcode}&daysInPast=7`;
    const resultData = await axios.get(url);

    const responseData = resultData.data.counties[0].historicData;
    console.log(responseData)
    //returns "date", "deathCt", "positiveCt"
    res.status(200).send(responseData);

  } catch (e) {
    res.status(500).send('Server Error')
  }
}







module.exports = handleGetData;


