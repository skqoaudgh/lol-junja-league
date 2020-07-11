const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const compression = require('compression');

const dotenv = require('dotenv').config();

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

app.get('/', (req, res, next) => {
  res.render('index.ejs');
});
