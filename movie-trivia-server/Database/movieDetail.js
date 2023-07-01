const mongoose = require("mongoose");

const moviedetail = new mongoose.Schema({
  movieName: String,
  leadActor: String,
  leadActress: String,
  genre: String,
  yearLaunched: String,
  dialog: String,
  director: String,
});

const movieDetailModel = new mongoose.model("moviedetail", moviedetail);
module.exports = movieDetailModel;
