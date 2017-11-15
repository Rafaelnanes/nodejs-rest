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
  db.createTable('users', {
    _id: { type: 'int', primaryKey: true },
    login: 'string',
    password: 'string',
    permissions: 'array'
  });

  db.createTable('products', {
    _id: { type: 'int', primaryKey: true },
    name: 'string'
  });

  callback();
};

exports.down = function (db, callback) {
  db.dropTable('migrations');
  db.dropTable('users');
  db.dropTable('products');
  callback();
};

exports._meta = {
  "version": 1
};
