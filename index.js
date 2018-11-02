"use strict";

function AuthBeam(dbDriver, dbConn, usersTableName){
  this.dbDriver = dbDriver;
  this.dbConn = dbConn;
  this.usersTableName = usersTableName;
}

module.exports = AuthBeam;

AuthBeam.prototype.getAllUsers = function () {
  switch(this.dbDriver.toLowerCase()) {
    case 'mongodb':
    case 'mongo-native':
    case 'mongoose':
    case 'mongojs':
      return fetchAllUsersMongo(this.dbConn, this.usersTableName);
      break;
    case 'pg':
    case 'pg-native':
      return fetchAllUsersPG(this.dbConn, this.usersTableName);
      break;
    default:
      console.log("Your database driver isn't supported. We support: mongodb, mongoose, mongojs, waterfall, pg, pg-native");
  }
}

function fetchAllUsersMongo(db, usersTableName) {
  return new Promise((resolve, reject) => {
    db.collection(usersTableName).find({}).toArray((err, users) => {
      if (err) return reject(err);
      return resolve(users);
    });
  });
}

function fetchAllUsersPG(db, usersTableName) {
  const query = {
    text: 'SELECT username FROM ' + usersTableName
  }
  return new Promise((resolve, reject) => {
    db.query(query, (err, res) => {
      if (err) return reject(err);
      return resolve (res.rows);
    });
  });
}