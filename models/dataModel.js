const mongoose = require("mongoose");

const { Schema } = mongoose;

const dataSchema = new Schema ({
  date: date,
  confirmed: int,
  deaths: int,
  last_update: date,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Book;
