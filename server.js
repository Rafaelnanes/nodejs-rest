var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');
var expressValidator = require('express-validator');

var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // converte as entradas da aplicação para serem pegas no req.body
app.use(bodyParser.json());
app.use(expressValidator());

consign()
    .include('./config/database.js')
    .then('config/constants.js')
    .then('config/logger.js')
    .then('config/middlewares.js')
    .then('config/utils.js')
    .then('api/dao') // first dao then controllers, otherwise will throw NPE when get DAO from the Controller
    .then('api/mediator')
    .then('api/security/auth.js')
    .then('api/controller')
    .into(app);

var port = 8080;

app.listen(port);
console.log(`Listening port ${port}`);

module.exports = app;


