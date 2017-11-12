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
    password: 'string'
  });

  db.createTable('permissions', {
    _id: { type: 'int', primaryKey: true },
    name: 'string'
  });

  db.createTable('users-permissions', {
    user_id: 'int',
    permission_id: 'int'
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
  db.dropTable('permissions');
  db.dropTable('users-permissions');
  db.dropTable('products');
  callback();
};

exports._meta = {
  "version": 1
};
