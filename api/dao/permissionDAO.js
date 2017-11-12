module.exports = function (app) {
    var Mongoose = app.config.database;
    var utils = app.config.utils;

    var permissionsSchema = new Mongoose.Schema({
        name: String
    });

    var usersPermissionsSchema = new Mongoose.Schema({
        permission_id: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'permissions' }],
        user_id: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'users' }]
    });

    var PermissionModel = Mongoose.model('permissions', permissionsSchema);
    var UserPermissionModel = Mongoose.model('users-permissions', usersPermissionsSchema);

    var findPermissionByName = function (permissionName, callback) {
        PermissionModel.findOne({ name: permissionName }, function (error, doc) {
            var response = utils.defaultResponseHandler(error, doc, 'Error getting permission');
            callback(response);
        }); 
    }

    var findByUserId = function (id, permissionName, callback) {
        findPermissionByName(permissionName, function (response) {
            if(response.doc){
                var query = { user_id: id, permission_id: response.doc._id };
                UserPermissionModel.find(query)
                    .populate('user_id', 'permission_id')
                    .exec(function (error, doc) {
                        var response = utils.defaultResponseHandler(error, doc, 'Error getting user permission');
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