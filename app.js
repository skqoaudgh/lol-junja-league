const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const compression = require('compression');

const dotenv = require('dotenv').config();

const Player = require('./model/Player');
const Game = require('./model/Game');

const { isNumber } = require('./util');

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
  const players = await Player.find().sort('-score');
  const games = await Game.find();
  res.render('index.ejs', { players, games });
});

app.post('/', async (req, res, next) => {
  try {
    const { home, homeScore, away, awayScore } = req.body;
    if (!isNumber(homeScore) || !isNumber(awayScore)) {
      res.redirect('/');
    } else {
      const homePlayer = await Player.findOne({ name: home });
      const awayPlayer = await Player.findOne({ name: away });

      if (!homePlayer || !awayPlayer) {
        res.redirect('/');
      } else {
        const winner = homeScore > awayScore ? homePlayer : awayPlayer;
        const loser = homeScore > awayScore ? awayPlayer : homePlayer;

        // Win Player
        winner.win = winner.win + 1;
        winner.score = winner.score + 2;
        await winner.save();

        // Lose Player
        loser.lose = loser.win + 1;
        loser.score = loser.score + 1;
        await loser.save();

        // Game
        const game = new Game({
          home: home,
          away: away,
          homeScore: Number(homeScore),
          awayScore: Number(awayScore),
          winner: winner.name,
        });
        await game.save();

        res.redirect('/');
      }
    }
  } catch (err) {
    console.error(err);
  }
});

app.post('/player', async (req, res, next) => {
  try {
    const { name } = req.body;
    const isExist = await Player.find({ name: name });
    if (isExist.length > 0) {
      res.redirect('/');
    } else {
      const player = new Player({
        name,
        win: 0,
        lose: 0,
        score: 0,
      });
      await player.save();

      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
  }
});
