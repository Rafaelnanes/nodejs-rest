module.exports = function (app) {
    var __permissionDAO = app.api.dao.permissionDAO;

    var findByUserId = function (userId, permissionName, callback) {
        __permissionDAO.findByUserId(userId, function (response) {
            var isPermissionFound = false;
            if (response.doc) {
                response.doc.forEach(function (item) {
                    if (permissionName == item.name) {
                        isPermissionFound = true;
                    }
                });
            }
            callback(isPermissionFound);
        });
    };

    return {
        findByUserId: findByUserId
    };

};