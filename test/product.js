//process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;
var token;
chai.use(chaiHttp);

describe('/POST login', function () {
    var user = { "login": "admin", "password": "admin" };
    it('Should return token', function (done) {
        chai.request(server)
            .post('/login')
            .send(user)
            .end(function (error, res) {
                assert.equal(200, res.status);
                token = res.headers['x-auth-token'];
                assert.isNotNull(token);
                done();
            });
    });
});


describe('/POST product', function () {
    var product = { "name": "product 4" };
    it('Should insert a new product', function (done) {
        chai.request(server)
            .post('/product')
            .send(product)
            .set(server.config.constants.TOKEN_HEADER, token)
            .end(function (error, res) {
                assert.equal(200, res.status);
                assert.equal(0, res.body.status);
                assert.isNotNull(res.body.doc);
                done();
            });
    });
});

describe('/GET product', function () {
    it('Should return a product list', function (done) {
        chai.request(server)
            .get('/product')
            .set(server.config.constants.TOKEN_HEADER, token)
            .end(function (error, res) {
                assert.equal(200, res.status);
                assert.equal(4, res.body.doc.length);
                done();
            });
    });
});
