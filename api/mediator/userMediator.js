module.exports = function (app) {
    var __userDAO = app.api.dao.userDAO;

    var save = function (user, callback) {
        __userDAO.findByLogin(user.login, function (response) {
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
        save: save
    }

}