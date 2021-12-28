'use strict';
const mongoose = require('mongoose');
const Data = require('./models/dataModel')

require('dotenv').config()

async function seed() {
  mongoose.connect(process.env.DB_URL);

  // const data = new Data({
  //   date: '2020-04-16',
  //   confirmed: 4345,
  //   deaths: 133,
  //   last_update: '2020-04-16 23:30:51',
  // })

  // await data.save( function (err) {
  //   if (err) {
  //     console.error(err);
  //   }else {
  //     console.log('already have that data!')
  //   }
  // });

  await Data.create({
    date: '2021-12-23',
    confirmed: 4234,
    deaths: 430,
    last_update: '2021-12-24 04:21:34',
    email: 'milsapmichael@gmail.com',
    province: 'Washington'
  })

  await Data.create({
    date: '2021-12-23',
    confirmed: 4234,
    deaths: 430,
    last_update: '2021-12-24 04:21:34',
    email: 'milsapmichael@gmail.com',
    province: 'Washington'
  })


}
    mongoose.disconnect();

seed();
