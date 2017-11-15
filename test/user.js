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

describe('/POST user', function () {
    it('Should insert a new user', function (done) {
        var user = { "login": "admin2", "password": "admin" };
        chai.request(server)
            .post('/user')
            .send(user)
            .set(server.config.constants.TOKEN_HEADER, token)
            .end(function (error, res) {
                assert.equal(200, res.status);
                assert.equal(0, res.body.status);
                assert.isNotNull(res.body.doc);
                done();
            });
    });
});

describe('/GET user', function () {
    it('Should return a user list', function (done) {
        chai.request(server)
            .get('/user')
            .set(server.config.constants.TOKEN_HEADER, token)
            .end(function (error, res) {
                assert.equal(200, res.status);
                assert.equal(3, res.body.doc.length);
                done();
            });
    });
});
