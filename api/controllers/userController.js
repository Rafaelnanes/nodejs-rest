var jwt = require('jsonwebtoken');

module.exports = function (app) {
    var __userDAO = app.api.dao.userDAO;
    var __moduleName = '/user';

    app.post(__moduleName, function (req, res) {

        var user = {
            login: req.body.login,
            password: req.body.password
        };

        __userDAO.save(user, function (response) {

            if (response.status == app.config.constants.STATUS.SUCCESS) {
                var token = jwt.sign(
                    { id: user._id },
                    app.config.constants.SECRET,
                    { expiresIn: app.config.constants.TOKEN_EXPIRE }
                )
                res.setHeader(app.config.constants.TOKEN_HEADER, token);
            }
            res.send(response);

        });

    });

}