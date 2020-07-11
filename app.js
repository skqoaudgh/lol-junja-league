const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const compression = require('compression');

const dotenv = require('dotenv').config();

const Player = require('./model/Player');
const Game = require('./model/Game');

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(2000, console.log('Express server is opened on port 2000.'));

app.engine('html', require('ejs').renderFile);

app.use(compression());

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public/assets/favicon.ico')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
  const players = await Player.find().sort('name');
  const games = await Game.find();
  res.render('index.ejs', { players, games });
});

app.post('/', async (req, res, next) => {
  try {
    const { home, homeScore, away, awayScore } = req.body;
    const winner = awayScore > homeScore ? away : home;
    const loser = awayScore > homeScore ? home : away;

    // Win Player
    await Player.findOneAndUpdate(
      { name: winner },
      { $inc: { win: 1, score: 2 } }
    );

    // Lose Player
    await Player.findOneAndUpdate(
      { name: loser },
      { $inc: { lose: 1, score: 1 } }
    );

    // Game
    const game = new Game({
      home,
      away,
      homeScore,
      awayScore,
      winner,
    });
    await game.save();

    res.redirect('/');
  } catch (err) {
    console.error(err);
  }
});
