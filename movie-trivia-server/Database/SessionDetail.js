const mongoose = require("mongoose");

const sessionDetail = new mongoose.Schema({
  room: String,
  players: [
    {
      player: String,
    },
  ],
});

const SessionDetailModel = new mongoose.model ("SessionDetail",sessionDetail);
module.exports = SessionDetailModel;
