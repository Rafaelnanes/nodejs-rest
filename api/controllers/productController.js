module.exports = function (app) {
    var __COLLECTION_NAME = 'product';
    var __productDAO = app.api.dao.productDAO;

    app.post('/api', function (req, res) {
        var data = req.body;
        __productDAO.save(data, function (response) {
            res.send(response);
        });
    });

    app.get('/api', function (req, res) {
        __productDAO.findByQuery({ 'name': /Product/i }, function (response) {
            res.send(response);
        });
    });

    app.get('/api/:id', function (req, res) {
        __productDAO.findById(req.params.id, function (response) {
            res.send(response);
        });
    });


}
