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

    var hasUserPermission = function (userId, permissionName, callback) {
        var query = {
            _id: userId,
            permissions: permissionName
        };
        __userDAO.findOneByQuery(query, function (response) {
            var isPermissionFound = false;
            if (response.doc) {
                isPermissionFound = true;
            }
            callback(isPermissionFound);
        });
    };

    var findOneByQuery = function (query, callback) {
        __userDAO.findOneByQuery(query, function (response) {
            if (!response.doc) {
                response.message = 'User not foud';
            }
            callback(response);
        });
    };

    var findAll = function (callback) {
        __userDAO.findAll(function (response) {
            callback(response);
        });
    };
    return {
        save: save,
        hasUserPermission: hasUserPermission,
        findOneByQuery: findOneByQuery,
        findAll: findAll
    };

};