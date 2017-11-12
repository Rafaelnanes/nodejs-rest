module.exports = function (app) {
    var __userPermissionDAO = app.api.dao.userPermissionDAO;

    var hasUserPermission = function (userId, permissionName, callback) {
        __userPermissionDAO.findByUserId(userId, permissionName, function (response) {
            var isPermissionFound = false;
            if (response.doc) {
                isPermissionFound = true;
            }
            callback(isPermissionFound);
        });
    };

    return {
        hasUserPermission: hasUserPermission
    };

};