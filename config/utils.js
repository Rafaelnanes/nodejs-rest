var crypto = require('crypto');

module.exports = function (app) {
    var __hashType = app.config.constants.HASH_TYPE;

    var defaultDaoHandler = function (error, doc, messageError, messageSuccess) {
        var __response = {};
        var __STATUS = app.config.constants.STATUS;

        if (error) {
            __response.status = __STATUS.BAD_REQUEST;
            __response.message = messageError + ', ' + error;
            __response.doc = null;
        } else {
            __response.status = __STATUS.SUCCESS;
            __response.message = messageSuccess;
            __response.doc = doc;
        }

        return __response;
    }

    var generatePassword = function (password) {
        return crypto.createHash(__hashType).update(password).digest('hex');
    }

    var isPasswordMatches = function (password, passwordHashed) {
        var dbPassword = crypto.createHash(__hashType).update(password).digest('hex');
        return dbPassword === passwordHashed;
    }

    return {
        defaultDaoHandler: defaultDaoHandler,
        generatePassword: generatePassword,
        isPasswordMatches: isPasswordMatches
    }
}