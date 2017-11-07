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

    app.use(function (req, res, next) {
        if(req.url != 'login'){
            var token = req.headers[app.config.constants.TOKEN_HEADER];
            var response = {
                status : app.config.constants.STATUS.UNAUTHORIZED,
                message: 'Failed to authenticate token.'
            }

            if (!token){
                return res.status(500).send(response);
            } 

            jwt.verify(token, app.config.constants.SECRET, function (err, decoded) {
                if (err){
                    return res.status(500).send(response);
                } 
            });
        }
        
        next();
    });

    app.use(function (error, req, res, next) {
        var response = {
            status : app.config.constants.STATUS.INTERNAL_ERROR,
            message: 'Please contact the support'
        }
        res.status(500).send(response);
        next();
    });
}