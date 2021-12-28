const mongoose = require("mongoose");

const { Schema } = mongoose;

const dataSchema = new Schema ({
  date: String,
  confirmed: Number,
  deaths: Number,
  last_update: String,
  email: String,
  province: String
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
