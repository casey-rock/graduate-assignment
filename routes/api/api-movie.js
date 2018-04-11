var express = require('express');
var router = express.Router();
var app = express();
var movieController = require('../../controllers/movieController');
var MovieService = movieController.MovieService;

//setting content-type to JSON for all responses
//preflight middleware
router.use((req, res, next)=>{
  res.set({
    'Content-type':'application/json',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
  });
  if(req.method == 'OPTIONS'){
    return res.status(200).end();
  }
  next();
})

router.get('/', (req, res, next)=>{
  MovieService.list()
    .then((movie)=>{
      res.status(200);
      res.send(JSON.stringify(movie));
    })
    .catch((err)=>{console.log(err);});
});

router.get('/:movieid', (req, res, next)=>{
  MovieService.showOne(req.params.movieid)
    .then((movie)=>{
      res.status(200);
      res.send(JSON.stringify(movie));
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
    .then((movie)=>{
      res.status(201);
      res.send(JSON.stringify(movie));
    })
    .catch((err)=>{console.log(err);});
});

router.put('/:movieid', (req, res, next)=>{
  MovieService.update(req.params.movieid, req.body)
    .then((movie)=>{
      res.status(200);
      res.send(JSON.stringify(movie));
    })
    .catch((err)=>{
      res.status(404);
      res.end();
    });
});

router.delete('/:movieid', (req, res, next)=>{
  MovieService.delete(req.params.movieid)
    .then((movie)=>{
      res.status(200);
      res.send(JSON.stringify(movie));
    })
    .catch((err)=>{
      res.status(404);
      res.end();
    });
});

module.exports = router;
