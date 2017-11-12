module.exports = function (app) {
    var __permissionDAO = app.api.dao.permissionDAO;

    var findByUserId = function (userId, permissionName, callback) {
        __permissionDAO.findByUserId(userId, permissionName, function (response) {
            var isPermissionFound = false;
            if (response.doc) {
                isPermissionFound = true;
            }
            callback(isPermissionFound);
        });
    };

    return {
        findByUserId: findByUserId
    };

};