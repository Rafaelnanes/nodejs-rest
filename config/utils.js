var crypto = require('crypto');

module.exports = function (app) {
    var __hashType = app.config.constants.HASH_TYPE;
    var __STATUS = app.config.constants.STATUS;

    var defaultResponseHandler = function (error, doc, messageError, messageSuccess) {
        var __response = {};

        if (error) {
            __response.status = __STATUS.BAD_REQUEST;
            if (messageError) {
                __response.message = messageError + ', ' + error;
            } else {
                __response.message = error;
            }
            __response.doc = null;
        } else {
            __response.status = __STATUS.SUCCESS;
            __response.message = messageSuccess;
            __response.doc = doc;
        }

        return __response;
    };

    var generatePassword = function (password) {
        return crypto.createHash(__hashType).update(password).digest('hex');
    };

    var checkAsserts = function (asserts) {
        return function (req, res, next) {
            var hasError = false;
            asserts.forEach(function (obj) {
                if (obj.type == 'required') {
                    req.assert(obj.name, req.body[obj.name] + ' is required.').notEmpty();
                }
            });

            var errors = req.validationErrors();
            if (errors) {
                var finalMessage = [];
                errors.forEach(function (obj) {
                    var message = "";
                    message = obj.param + ' ' + obj.msg.replace('undefined', '');
                    finalMessage.push(message);
                })
                var response = defaultResponseHandler(finalMessage, null);
                response.status = __STATUS.BAD_REQUEST;
                res.status(400).send(response);
            } else {
                next();
            }
        };

    };

    return {
        defaultResponseHandler: defaultResponseHandler,
        generatePassword: generatePassword,
        checkAsserts: checkAsserts
    };
};