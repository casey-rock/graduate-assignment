var express = require('express');
var router = express.Router();
var app = express();
var movieController = require('../controllers/movieController');
var Movie = require('../models/movieModel');
var MovieService = movieController.MovieService;

router.get('/', (req, res, next)=>{
  MovieService.list()
    .then((movies)=>{
      res.render('add-movie', {
        movies: movies
      });
    })
    .catch((err)=>{console.log(err);});
});

router.get('/:movieid', (req, res, next)=>{
  MovieService.showOne({'_id': req.params.movieid})
    .then((movie)=>{
      res.render('updateMovie', {
        movie: movie,
      });
    })
    .catch((err)=>{console.log(err);});
});

router.post('/', (req, res, next)=>{
  var movie = {
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
    description: req.body.description,
    review: req.body.review
  }
  MovieService.create(movie)
    .then(()=>{
      res.redirect('/add-movie');
    })
    .catch((err)=>{console.log(err);});
});

router.post('/:movieid', (req, res, next)=>{
  MovieService.showOne({'_id': req.params.movieid})
    .then((movie)=>{
      var data = {
        review: req.body.review
      }
      movie.set(data);
      movie.save()
      .then(()=>{
        res.redirect('/add-movie');
      })
    })
    .catch((err)=>{console.log(err);});
});

router.delete('/:movieid', (req, res, next)=>{
  MovieService.delete(req.params.movieid)
    .then((movie)=>{
      res.redirect('/add-movie');
    })
    .catch((err)=>{console.log(err);});
});

module.exports = router;
