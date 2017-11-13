var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var crypto = require('crypto');

module.exports = function (app) {
    var __userMediator = app.api.mediator.userMediator;
    var __utils = app.config.utils;
    var params = {
        secretOrKey: app.config.constants.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromHeader('x-auth-token')
    };

    var strategy = new Strategy(params, function (payload, done) {
        var query = { _id: payload.id };
        __userMediator.findOneByQuery(query, function (response) {
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
        authenticatePermission: function (permissionName) {
            return function (req, res, next) {
                __userMediator.hasUserPermission(req.user.id, permissionName, function (isPermissionFound) {
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