var mongoose = require('mongoose');

//access Schema constructor
var Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String},
  genre: {type: String},
  year: {type: String},
  description: {type: String},
  review: {type: String},
  createdAt: {type: Date},
  updatedAt: {type: Date}
})

schema.pre('save', function(next){
  if(!this.createdAt){
    this.createdAt = new Date();
  }else{
    this.updatedAt = new Date();
  }
  next();
})

//export model with name and schema
module.exports = mongoose.model('Movie', schema);
