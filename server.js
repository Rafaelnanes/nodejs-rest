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
    .then('api/dao') // first dao then controllers, otherwise will throw NPE when get DAO from the Controller
    .then('api/security/auth.js')
    .then('api/controllers')
    .then('config/middlewares.js')
    .into(app);

var port = 8080;

app.listen(port);

console.log('Listening port ' + port);



