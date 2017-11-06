var Mongoose = require('mongoose');

module.exports = function () {

    var db = Mongoose.connection;

    db.on('error', console.error);
    db.once('open', function () {
        console.log('Conectado ao MongoDB.')
    });

    return Mongoose.connect('mongodb://localhost/rest');
}   