module.exports = function (app) {
    var __productDAO = app.api.dao.productDAO;
    var __moduleName = '/product';

    app.post(__moduleName, app.api.security.auth.authenticate(), function (req, res) {
        var data = req.body;
        __productDAO.save(data, function (response) {
            res.send(response);
        });
    });

    app.get(__moduleName, app.api.security.auth.authenticate(), function (req, res) {
        __productDAO.findByQuery({ 'name': /Product/i }, function (response) {
            res.send(response);
        });
    });

    app.get(__moduleName + '/:id', app.api.security.auth.authenticate(), function (req, res) {
        __productDAO.findById(req.params.id, function (response) {
            res.send(response);
        });
    });


}
