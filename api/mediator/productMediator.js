module.exports = function (app) {
    var __productDAO = app.api.dao.productDAO;

    var save = function (product, callback) {
        __productDAO.save(product, function (response) {
            callback(response);
        });
    };

    var findById = function (id, callback) {
        __productDAO.findById(id, function (response) {
            callback(response);
        });
    }

    var findByQuery = function (query, callback) {
        __productDAO.findByQuery(query, function (response) {
            callback(response);
        });
    };
    
    return {
        save: save,
        findByQuery: findByQuery,
        findById: findById
    };

};