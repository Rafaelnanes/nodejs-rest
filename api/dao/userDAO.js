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
            var response = utils.defaultResponseHandler(error, doc, 'Error getting user');
            callback(response);
        });
    };

    var findByLogin = function (login, callback) {
        UserModel.findOne({ login: login }, function (error, doc) {
            var response = utils.defaultResponseHandler(error, doc, 'Error getting user');
            callback(response);
        });
    };

    var findOneByQuery = function (query, callback) {
        UserModel.findOne(query, function (error, doc) {
            var response = utils.defaultResponseHandler(error, doc, 'Error getting user');
            callback(response);
        });
    };

    var findByPermissions = function (query, permissions, callback) {
        UserModel.find(query).where(permissions).in(permissions).exec(function(error, doc){
            var response = utils.defaultResponseHandler(error, doc, 'Error getting user');
            callback(response);
        });
    };

    var save = function (user, callback) {

        var hashedPassword = bcrypt.hashSync(user.password, 8);

        var model = new UserModel({
            login: user.login,
            password: user.password,
            permissions: user.permissions
        });

        model.save(function (error, doc) {
            var response = utils.defaultResponseHandler(error, doc, 'Error saving user', 'User saved');
            callback(response);
        });
    };

    return {
        findById: findById,
        findByPermissions: findByPermissions,
        findOneByQuery: findOneByQuery,
        findByLogin: findByLogin,
        save: save
    };
};