var mongodb = require('mongodb');

var database = new mongodb.Db(
    'rest', 
    new mongodb.Server('localhost', 27017), 
    {}
);

module.exports = function(){
   return database;
}   