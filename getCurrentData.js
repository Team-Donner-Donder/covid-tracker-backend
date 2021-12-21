"use strict";

const axios = require("axios");

async function getCurrentData(req, res) {
let options = {
  method: 'GET',
  url: 'https://covid-19-statistics.p.rapidapi.com/reports',
  params: {
    region_province: 'Washington',
    iso: 'USA',
    region_name: 'US',
    q: 'US Washington',
    date: '2021-12-16'
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