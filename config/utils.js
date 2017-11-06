module.exports = function () {

    var defaultDaoHandler = function (error, doc, messageError, messageSuccess) {
        var response = {};
        if (error) {
            response.status = 0;
            response.message = messageError + ', ' + error;
            response.doc = null;
        } else {
            response.status = 1;
            response.message = messageSuccess;
            response.doc = doc;
        }

        return response;
    }

    return {
        defaultDaoHandler: defaultDaoHandler
    }
}