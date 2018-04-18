var Movie = require('../models/movieModel');


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
}

module.exports.MovieService = MovieService;
