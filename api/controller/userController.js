module.exports = function (app) {
    var __userMediator = app.api.mediator.userMediator;
    var __moduleName = '/user';
    var __utils = app.config.utils;
    var __auth = app.api.security.auth;

    app.post(
        __moduleName,
        __auth.authenticate(),
        __auth.authenticatePermission('user.insert'),
        __utils.checkAsserts(
            [{
                name: 'login',
                type: 'required'
            },
            {
                name: 'password',
                type: 'required'
            }]
        ),
        function (req, res) {
            var password = __utils.generatePassword(req.body.password);
            var user = {
                login: req.body.login,
                password: password
            };

            __userMediator.save(user, function (response) {
                res.send(response);
            });

        });

    app.get(
        __moduleName,
        __auth.authenticate(),
        __auth.authenticatePermission('user.list'),
        function (req, res, next) {
            __userMediator.findAll(function (response) {
                res.send(response);
            });
        });

};