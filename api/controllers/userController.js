var jwt = require('jsonwebtoken');

module.exports = function (app) {
    var __userDAO = app.api.dao.userDAO;
    var __moduleName = '/user';
    var utils = app.config.utils;

    app.post(__moduleName, app.api.security.auth.authenticate(), function (req, res) {
        var password = utils.generatePassword(req.body.password);
        var user = {
            login: req.body.login,
            password: password
        };

        __userDAO.findByLogin(user.login, function(response){
            if(!!response.doc){
                response.doc = {};
                response.status = app.config.constants.STATUS.BAD_REQUEST;
                response.message = 'User already exists';
                res.send(response);
            }else{
                __userDAO.save(user, function (response) {
                    res.send(response);
                });
            }
        });

    });

}