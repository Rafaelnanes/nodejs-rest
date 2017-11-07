var bcrypt = require('bcryptjs');

module.exports = function (app) {
    var Mongoose = app.config.database;
    var utils = app.config.utils;

    var userSchema = new Mongoose.Schema({
        login: String,
        password: String
    });

    var UserModel = Mongoose.model('users', userSchema);

    var findById = function (id, callback) {
        UserModel.findById(id, function (error, doc) {
            var response = utils.defaultDaoHandler(error, doc, 'Error getting user');
            callback(response);
        });
    }

    var findByQuery = function (query, callback) {
        UserModel.find(query, function (error, doc) {
            var response = utils.defaultDaoHandler(error, doc, 'Error getting user');
            callback(response);
        })
    }

    var save = function (user, callback) {

        var hashedPassword = bcrypt.hashSync(user.password, 8);

        var model = new UserModel({
            login: user.login,
            password: user.password
        });

        model.save(function (error, doc) {
            var response = utils.defaultDaoHandler(error, doc, 'Error saving user', 'User saved');
            callback(response);
        });
    }

    return {
        findById: findById,
        findByQuery: findByQuery,
        save: save
    }
}