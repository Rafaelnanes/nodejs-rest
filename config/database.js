var mongodb = require('mongodb');
var Mongoose = require('mongoose');
var objectId = require('mongodb').ObjectId; // converte o tipo da primaryKey no mongodb

var database = new mongodb.Db(
    'rest',
    new mongodb.Server('localhost', 27017),
    {}
);

var crud = function (id, productModel) {
    /*
        var query = { name: 'example' };
        productModel.findOneAndUpdate(query, { "name": 'example2' }, { upsert: false }, function (err, doc) {
            console.log('sample -> ', doc.name);
        });
    */

    productModel.findById(id, function (error, doc) {
        doc.name = 'alterado';
        doc.save(function (error, doc) {
            if (error) {
                console.log('Error updating the document');
            } else {
                console.log('Document updated');
            }
        });
    });

    productModel.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            console.log('Error removing the document');
        } else {
            console.log('Document removed');
        }
    });
}

module.exports = function () {

    var db = Mongoose.connection;

    db.on('error', console.error);
    db.once('open', function () {
        console.log('Conectado ao MongoDB.')
    });

    Mongoose.connect('mongodb://localhost/rest');

    var productSchema = new Mongoose.Schema({
        name: String,
    });

    var productModel = Mongoose.model('products', productSchema);


    var productSample = new productModel({
        name: 'product example',
    });

    productSample.save(function (err, productSample) {
        if (err) {
            console.log('Error saving document');
        } else {
            console.log('Document saved');
            crud(productSample._id, productModel);
        }
    });




    return database;
}   