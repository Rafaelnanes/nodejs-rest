var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var crypto = require('crypto');

module.exports = function (app) {
    var __userDAO = app.api.dao.userDAO;
    var __permissionMediator = app.api.mediator.permissionMediator;
    var __utils = app.config.utils;
    var params = {
        secretOrKey: app.config.constants.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromHeader('x-auth-token')
    };

    var strategy = new Strategy(params, function (payload, done) {
        var query = { _id: payload.id };
        __userDAO.findOneByQuery(query, function (response) {
            if (response.doc) {
                return done(null, { id: response.doc.id });
            } else {
                return done(new Error("User not found"), null);
            }

        });
    });

    passport.use(strategy);
    app.use(passport.initialize());

    app.post("/login", function (req, res) {
        var status = 401;
        //TODO put de assert
        if (req.body.login && req.body.password) {
            var password = __utils.generatePassword(req.body.password);
            var user = {
                login: req.body.login,
                password: password
            };

            __userDAO.findOneByQuery(user, function (response) {
                if (response.doc) {
                    var payload = { id: user.id };
                    var token = jwt.sign(
                        { id: response.doc._id },
                        app.config.constants.JWT_SECRET,
                        { expiresIn: app.config.constants.TOKEN_EXPIRE }
                    );
                    res.setHeader(app.config.constants.TOKEN_HEADER, token);
                }
                res.send(response);
            });

        }
    });

    return {
        authenticate: function () {
            return passport.authenticate("jwt", app.config.constants.JWT_SESSION);
        },
        authenticateWithRole: function (permissionName) {
            return function (req, res, next) {
                __permissionMediator.findByUserId(req.user.id, permissionName, function (isPermissionFound) {
                    if (isPermissionFound) {
                        next();
                    } else {
                        res.sendStatus(401);
                    }
                });
            };
        }

    };
};