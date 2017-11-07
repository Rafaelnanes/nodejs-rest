module.exports = function (app) {
    var __productDAO = app.api.dao.productDAO;
    var __moduleName = '/product';

    app.post(__moduleName, function (req, res) {
        var data = req.body;
        __productDAO.save(data, function (response) {
            res.send(response);
        });
    });

    app.get(__moduleName, function (req, res) {
        __productDAO.findByQuery({ 'name': /Product/i }, function (response) {
            res.send(response);
        });
    });

    app.get(__moduleName + '/:id', function (req, res) {
        __productDAO.findById(req.params.id, function (response) {
            res.send(response);
        });
    });


}
