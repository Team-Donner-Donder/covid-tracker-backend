"use strict";

const axios = require("axios");

async function getCurrentData(req, res) {

  let state = req.query.state
  let date = req.query.date

  let options = {
    method: 'GET',
    url: 'https://covid-19-statistics.p.rapidapi.com/reports',
    params: {
      region_province: state,
      iso: 'USA',
      region_name: 'US',
      q: `US ${state}`,
      date: date //YYYY-MM-DD
    },
    headers: {
      'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
      'x-rapidapi-key': '3321cf4eb7mshe5312d1626ed1bbp1fc319jsnf6f5f1b8fb94'
    }
  };

  axios.request(options).then(function (response) {
    // console.log(response.data.data[0].region)
    res.status(200).send(response.data)
  }).catch(function (error) {
    console.error(error);
  });
}


module.exports = getCurrentData;
