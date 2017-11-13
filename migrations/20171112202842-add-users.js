var mongoose = require('mongoose');

'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  var tableName = 'users';

  var get = db.insert(tableName, {
    login: 'admin',
    password: '21232f297a57a5a743894a0e4a801fc3',
    permissions:[
      'user.insert',
      'user.list',
      'product.insert',
      'product.list'
    ]
  });

  db.insert(tableName, {
    login: 'guest',
    password: '21232f297a57a5a743894a0e4a801fc3',
    permissions:[
      'product.insert',
      'product.list'
    ]
  });

  callback();
};

exports.down = function (db, callback) {
  callback();
};

exports._meta = {
  "version": 1
};
