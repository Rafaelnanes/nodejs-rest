module.exports = function (app) {
    var __Mongoose = app.config.database;
    var __utils = app.config.utils;
    var __permissionDAO = app.api.dao.permissionDAO;

    var usersPermissionsSchema = new __Mongoose.Schema({
        permission_id: [{ type: __Mongoose.Schema.Types.ObjectId, ref: 'permissions' }],
        user_id: [{ type: __Mongoose.Schema.Types.ObjectId, ref: 'users' }]
    });

    var UserPermissionModel = __Mongoose.model('users-permissions', usersPermissionsSchema);

    var findByUserId = function (id, permissionName, callback) {
        __permissionDAO.findPermissionByName(permissionName, function (response) {
            if(response.doc){
                var query = { user_id: id, permission_id: response.doc._id };
                UserPermissionModel.find(query)
                    .populate('user_id', 'permission_id')
                    .exec(function (error, doc) {
                        var response = __utils.defaultResponseHandler(error, doc, 'Error getting user permission');
                        callback(response);
                    });
            }else{
                callback(response);
            }
        });


    };

    return {
        findByUserId: findByUserId
    };
};