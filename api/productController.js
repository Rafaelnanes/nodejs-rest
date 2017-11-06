module.exports = function(app){
    var __COLLECTION_NAME = 'product';
    var __database = app.config.database;

    app.post('/api', function (req, res) {
        var dados = req.body;

        __database.open(function (error, mongoClient) {
            mongoClient.collection(__COLLECTION_NAME, function (error, collection) {
                collection.insert(dados, function (error, records) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.status(201).json(records);
                    }
                    mongoClient.close();
                });
            });
        });

    });

    app.get('/api', function (req, res) {

        __database.open(function (error, mongoClient) {
            mongoClient.collection(__COLLECTION_NAME, function (error, collection) {
                collection.find().toArray(function (error, results) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(results);
                    }
                    mongoClient.close();
                });
            });
        });
    });

    app.get('/api/:id', function (req, res) {

        var query = { "_id": objectId(req.params.id) };

        __database.open(function (error, mongoClient) {
            mongoClient.collection(__COLLECTION_NAME, function (error, collection) {
                collection.find(query).toArray(function (error, results) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(results);
                    }
                    mongoClient.close();
                });
            });
        });
    });


}
