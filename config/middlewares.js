var jwt = require('jsonwebtoken');

module.exports = function (app) {
    var __logger = app.config.logger;
    /*
    app.use(function (req, res, nex) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Credentials", true);
    });
    */

    app.use(function (req, res, next) {
        var token = req.get('x-auth-token');
        var message = 'url: ' + req.url + ', body: ' + JSON.stringify(req.body);
        if (token) {
            var jwtDecoded = jwt.decode(token, app.config.constants.JWT_SECRET);
            message = 'User: ' + jwtDecoded.id + ', ' + message;
        }
        __logger.info(message);
        next();
    });

    app.use(function (error, req, res, next) {
        var response = {
            status: app.config.constants.STATUS.INTERNAL_ERROR,
            message: error.stack
        }
        res.status(500).send(response);
        next();
    });
};