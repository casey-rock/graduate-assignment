var express = require('express');
var router = express.Router();
var app = express();
var movieController = require('../controllers/movieController');
var Movie = require('../models/movieModel');
var MovieService = movieController.MovieService;
//step 2 set up movie-art
const posterFinder = require('movie-art');

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
  //step 3 - add 'poster' var and try to populate.  If works, add it; if not, avoid it
//tested with console.log, works
//last step: add to pug!
  posterFinder(req.body.title, (err, res)=>{
    movie = {
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      description: req.body.description,
      poster: res,
      review: req.body.review
    };

    MovieService.create(movie);
  })
  .then(()=>{
    res.redirect('/add-movie');
  })
  .catch((err)=>{console.log(err);});
  //callback




  //.then(moviePoster;).catch(console.log);
      /*
        .then(()=>{
          console.log(movie);
          return movie.poster;
        })
        .catch((err)=>{
          console.log(err);
        });
        */


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

router.post('/delete/:movieid', (req, res, next)=>{
  MovieService.delete(req.params.movieid)
      .then((movie)=>{
        res.redirect('/add-movie');
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
