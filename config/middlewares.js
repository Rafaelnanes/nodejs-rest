var jwt = require('jsonwebtoken');

module.exports = function (app) {
    /*
    app.use(function (req, res, nex) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Access-Control-Allow-Credentials", true);
    });
    */

    app.use(function (error, req, res, next) {
        var response = {
            status: app.config.constants.STATUS.INTERNAL_ERROR,
            message: error.stack
        }
        res.status(500).send(response);
        next();
    });
}