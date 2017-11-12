module.exports = function (app) {
    var __productMediator = app.api.mediator.productMediator;
    var __moduleName = '/product';
    var __auth = app.api.security.auth;

    app.post(
        __moduleName,
        __auth.authenticate(),
        __auth.authenticatePermission('product.insert'),
        function (req, res) {
            var data = req.body;
            __productMediator.save(data, function (response) {
                res.send(response);
            });
        });

    app.get(
        __moduleName,
        __auth.authenticate(),
        __auth.authenticatePermission('product.list'),
        function (req, res) {
            __productMediator.findByQuery({ 'name': /Product/i }, function (response) {
                res.send(response);
            });
        });

    app.get(
        __moduleName + '/:id', __auth.authenticate(),
        __auth.authenticatePermission('product.list'),
        function (req, res) {
            __productMediator.findById(req.params.id, function (response) {
                res.send(response);
            });
        });
};
