module.exports = function (app) {

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

    return {
        defaultDaoHandler: defaultDaoHandler
    }
}