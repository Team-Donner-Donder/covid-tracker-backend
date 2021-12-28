let axios = require("axios").default;

let today = new Date();
let state = req.query.state
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

let options = {
  method: 'GET',
  url: 'https://covid-19-statistics.p.rapidapi.com/reports/total',
  params: {date: date},
  headers: {
    'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com',
    'x-rapidapi-key': '3321cf4eb7mshe5312d1626ed1bbp1fc319jsnf6f5f1b8fb94'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
