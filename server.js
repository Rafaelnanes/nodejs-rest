var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // converte as entradas da aplicação para serem pegas no req.body
app.use(bodyParser.json());

consign()
    .include('./config/database.js')
    .then('config/constants.js')
    .then('config/utils.js')
    .then('config/interceptors.js')
    .then('api/dao') // first dao then controllers, otherwise will throw NPE when get DAO from the Controller
    .then('api/controllers')
    .into(app);

var port = 8080;

app.listen(port);

console.log('Listening port ' + port);



