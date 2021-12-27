'use strict';
const mongoose = require('mongoose');
const Data = require('./models/dataModel')

require('dotenv').config()

async function seed() {
  mongoose.connect(process.env.DATABASE_URL);

  const data = new Data({
    date: '2020-04-16',
    confirmed: 4345,
    deaths: 133,
    last_update: '2020-04-16 23:30:51',
  })

  await data.save( function (err) {
    if (err) {
      console.error(err);
    }else {
      console.log('already have that data!')
    }
  });
}
    mongoose.disconnect();

seed();
