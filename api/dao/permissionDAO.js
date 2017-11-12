module.exports = function (app) {
    var __Mongoose = app.config.database;
    var __utils = app.config.utils;

    var permissionsSchema = new __Mongoose.Schema({
        name: String
    });

    var PermissionModel = __Mongoose.model('permissions', permissionsSchema);

    var findPermissionByName = function (permissionName, callback) {
        PermissionModel.findOne({ name: permissionName }, function (error, doc) {
            var response = __utils.defaultResponseHandler(error, doc, 'Error getting permission');
            callback(response);
        }); 
    };

    return {
        findPermissionByName: findPermissionByName
    };
};
