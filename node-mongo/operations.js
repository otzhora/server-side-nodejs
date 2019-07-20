const assert = require("assert");

exports.insertDocument = (db, document, collection, cb) => {
  const coll = db.collection(collection);
  coll.insert(document, (err, res) => {
    assert.equal(err, null);
    console.log(
      `Inserted ${res.result.n} documents into the collection ${collection}`
    );
    cb(res);
  });
};

exports.findDocuments = (db, collection, cb) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    cb(docs);
  });
};

exports.removeDocument = (db, document, collection, cb) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => {
    assert.equal(err, null);
    console.log("Removed the document", document);
    cb(result);
  });
};

exports.updateDocument = (db, document, update, collection, cb) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, res) => {
    assert.equal(err, null);
    console.log("Updated the document with ", update);
    cb(res);
  });
};
