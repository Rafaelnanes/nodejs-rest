module.exports = function (app) {
    var Mongoose = app.config.database;
    var utils = app.config.utils;

    var productSchema = new Mongoose.Schema({
        name: String,
    });

    var ProductModel = Mongoose.model('products', productSchema);

    var findById = function (id, callback) {
        ProductModel.findById(id, function (error, doc) {
            var response = utils.defaultResponseHandler(error, doc, 'Error getting product');
            callback(response);
        });
    }

    var findByQuery = function (query, callback) {
        ProductModel.find(query, 'name' /*properties returned*/, function (error, doc) {
            var response = utils.defaultResponseHandler(error, doc, 'Error getting products');
            callback(response);
        })
    }


    var save = function (product, callback) {
        var productModel = new ProductModel({
            name: product.name
        });

        productModel.save(function (error, doc) {
            var response = utils.defaultResponseHandler(error, doc, 'Error saving product', 'Product saved');
            callback(response);
        });
    }

    return {
        findById: findById,
        findByQuery: findByQuery,
        save: save
    }
}