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
  var tableName = 'users-permissions';

  var userInsert = mongoose.Types.ObjectId('56cb91bdc3464f14678934ca');
  var userList = mongoose.Types.ObjectId('56cb91bdc3464f14678934cb');
  var productInsert = mongoose.Types.ObjectId('56cb91bdc3464f14678934cc');
  var productList = mongoose.Types.ObjectId('56cb91bdc3464f14678934cd');

  var adminId = mongoose.Types.ObjectId('a6cb91bdc3464f14678934ca');
  var guestId = mongoose.Types.ObjectId('a6cb91bdc3464f14678934cb');

  //ADMIN
  db.insert(tableName, {
    user_id: adminId,
    permission_id: userInsert
  });

  db.insert(tableName, {
    user_id: adminId,
    permission_id: userList
  });

  db.insert(tableName, {
    user_id: adminId,
    permission_id: productList
  });

  db.insert(tableName, {
    user_id: adminId,
    permission_id: productInsert
  });

  //GUEST
  db.insert(tableName, {
    user_id: adminId,
    permission_id: productList
  });

  db.insert(tableName, {
    user_id: adminId,
    permission_id: userList
  });

  callback();
};

exports.down = function (db, callback) {
  callback();
};

exports._meta = {
  "version": 1
};
