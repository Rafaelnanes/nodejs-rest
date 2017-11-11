module.exports = function (app) {
    var __productMediator = app.api.mediator.productMediator;
    var __moduleName = '/product';

    app.post(__moduleName, app.api.security.auth.authenticate(), function (req, res) {
        var data = req.body;
        __productMediator.save(data, function (response) {
            res.send(response);
        });
    });

    app.get(__moduleName, app.api.security.auth.authenticate(), function (req, res) {
        __productMediator.findByQuery({ 'name': /Product/i }, function (response) {
            res.send(response);
        });
    });

    app.get(__moduleName + '/:id', app.api.security.auth.authenticate(), function (req, res) {
        __productMediator.findById(req.params.id, function (response) {
            res.send(response);
        });
    });


}
