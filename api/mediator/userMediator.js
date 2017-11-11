module.exports = function (app) {
    var __userDAO = app.api.dao.userDAO;

    var findByLogin = function (login, callback) {
        __userDAO.findByLogin(login, function (response) {
            if (!!response.doc) {
                response.doc = {};
                response.status = app.config.constants.STATUS.BAD_REQUEST;
                response.message = 'User already exists';
                callback(response);
            } else {
                __userDAO.save(user, function (response) {
                    callback(response);
                });
            }
        });
    }

    return {
        findByLogin: findByLogin
    }

}