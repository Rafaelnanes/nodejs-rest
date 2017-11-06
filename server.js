var express = require('express');
var bodyParser = require('body-parser');
var consign = require('consign');

var app = express();

app.use(bodyParser.urlencoded({ extended: true })); // converte as entradas da aplicação para serem pegas no req.body
app.use(bodyParser.json());

consign()
    .include('./config/database.js')
    .then('./api')
    .into(app);

var port = 8080;

app.listen(port);

console.log('Listening port ' + port);



