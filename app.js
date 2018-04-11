require('dotenv').config();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var addmovie = require('./routes/add-movie');
var apimovie = require('./routes/api/api-movie.js');
var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00-k9rhr.mongodb.net:27017,cluster0-shard-00-01-k9rhr.mongodb.net:27017,cluster0-shard-00-02-k9rhr.mongodb.net:27017/assignment4?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`)
var db = mongoose.connection;
var app = express();

//set up bodyParser for POST form handling
app.use(bodyParser.urlencoded({extended: true}));
var jsonParser = bodyParser.json();

//map static to public
app.use(express.static(path.join(__dirname, 'public')));

//set pug as view engine
app.set('views', './views');
app.set('view engine', 'pug');

//set routes
app.get('/', (req, res, next)=>{
  res.send('root');
});

app.use('/add-movie', addmovie);

app.use('/api', jsonParser, apimovie);

app.use((req, res, next)=>{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
