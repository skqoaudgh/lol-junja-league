const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  win: { type: Number, required: true },
  lose: { type: Number, required: true },
  score: { type: Number, required: true },
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
