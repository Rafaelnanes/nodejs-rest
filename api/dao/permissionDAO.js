module.exports = function (app) {
    var Mongoose = app.config.database;
    var utils = app.config.utils;

    var permissionsSchema = new Mongoose.Schema({
        name: String,
        users: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'users' }]
    });

    var PermissionModel = Mongoose.model('permissions', permissionsSchema);

    var findByUserId = function (id, callback) {
        PermissionModel.find({ user_id: id })
            .populate('user_id').
            exec(function (error, doc) {
                var response = utils.defaultResponseHandler(error, doc, 'Error getting user');
                callback(response);
            });
    };

    return {
        findByUserId: findByUserId
    };
};