var Movie = require('../models/movieModel');
//step 2 set up posterFinder
const posterFinder = require('movie-art');


class MovieService{
  // movie get - list
  static list(){
    return Movie.find({})
      .then((movie)=>{
        //if found, return movie
        return movie;
      })
  }

  // movie POST - create
  static create(obj){
     var movie = new Movie(obj);
     return movie.save();
  }

  // movie/:movieid - delete
  static delete(id){
    return Movie.findByIdAndRemove({_id: id})
      .then((obj)=>{
        return obj;
      })
  }

  // movie/:movieid - findOne
  static showOne(id){
    return Movie.findById(id)
      .then((movie)=>{
        return movie;
      });
  }

  // movie/:movieid - update
  static update(id, data){
    return Movie.findById(id)
     .then((movie)=>{
       movie.set(data);
       movie.save();
       return movie;
     });
   }

   //gets poster using movie-art package
   static getPoster(title){
     return posterFinder(title)
     .then((poster) => {
       return poster;
     })
     .catch((err) => {console.log(err)});
   }
}

module.exports.MovieService = MovieService;
