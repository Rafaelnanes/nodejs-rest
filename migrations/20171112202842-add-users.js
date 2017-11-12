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
  var adminId = mongoose.Types.ObjectId('a6cb91bdc3464f14678934ca');
  var guestId = mongoose.Types.ObjectId('a6cb91bdc3464f14678934cb');

  var get = db.insert(tableName, {
    _id: adminId,
    login: 'admin',
    password: '21232f297a57a5a743894a0e4a801fc3'
  });

  db.insert(tableName, {
    _id: guestId,
    login: 'guest',
    password: '21232f297a57a5a743894a0e4a801fc3'
  });

  callback();
};

exports.down = function (db, callback) {
  callback();
};

exports._meta = {
  "version": 1
};
