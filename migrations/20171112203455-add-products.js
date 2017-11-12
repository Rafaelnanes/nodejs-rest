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
  var tableName = 'products';
  db.insert(tableName, {
    name: 'Product 1'
  });

  db.insert(tableName, {
    name: 'Product 2'
  });

  db.insert(tableName, {
    name: 'Product 3'
  });

  callback();
};

exports.down = function (db, callback) {
  callback();
};

exports._meta = {
  "version": 1
};
