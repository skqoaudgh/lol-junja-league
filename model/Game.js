const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  home: { type: String, required: true },
  away: { type: String, required: true },
  homeScore: { type: Number, required: true },
  awayScore: { type: Number, required: true },
  winner: { type: String, required: true },
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;
