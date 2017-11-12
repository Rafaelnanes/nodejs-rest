var jwt = require('jsonwebtoken');

module.exports = function (app) {
    var __userMediator = app.api.mediator.userMediator;
    var __moduleName = '/user';
    var utils = app.config.utils;

    app.post(__moduleName, app.api.security.auth.authenticate(), function (req, res) {
        var password = utils.generatePassword(req.body.password);
        var user = {
            login: req.body.login,
            password: password
        };

        __userMediator.findByLogin(user.login, function (response) {
            res.send(response);
        });

    });

    app.get(__moduleName,
        app.api.security.auth.authenticate(),
        app.api.security.auth.authenticateWithRole('user.insert'),
        function (req, res, next) {
            res.send('test');
        })

}