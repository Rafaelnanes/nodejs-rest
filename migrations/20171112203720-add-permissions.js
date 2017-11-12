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
  var tableName = 'permissions';

  var userInsert = mongoose.Types.ObjectId('56cb91bdc3464f14678934ca');
  var userList = mongoose.Types.ObjectId('56cb91bdc3464f14678934cb');
  var productInsert = mongoose.Types.ObjectId('56cb91bdc3464f14678934cc');
  var productList = mongoose.Types.ObjectId('56cb91bdc3464f14678934cd');

  db.insert(tableName, {
    _id: userInsert,
    name: 'user.insert'
  });

  db.insert(tableName, {
    _id: userList,
    name: 'user.list'
  });

  db.insert(tableName, {
    _id: productInsert,
    name: 'product.insert'
  });

  db.insert(tableName, {
    _id: productList,
    name: 'product.list'
  });
  callback();
};

exports.down = function (db, callback) {
  callback();
};

exports._meta = {
  "version": 1
};
