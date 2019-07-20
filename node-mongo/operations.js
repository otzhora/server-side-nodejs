const assert = require("assert");

exports.insertDocument = (db, document, collection, cb) => {
  const coll = db.collection(collection);
  return Promise.resolve(coll.insert(document));
};

exports.findDocuments = (db, collection, cb) => {
  const coll = db.collection(collection);
  return Promise.resolve(coll.find({}).toArray());
};

exports.removeDocument = (db, document, collection, cb) => {
  const coll = db.collection(collection);
  return Promise.resolve(coll.deleteOne(document));
};

exports.updateDocument = (db, document, update, collection, cb) => {
  const coll = db.collection(collection);
  return Promise.resolve(coll.updateOne(document, { $set: update }, null));
};
