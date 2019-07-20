const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url)
  .then(client => {
    console.log("Connected");

    const db = client.db(dbname);
    const dish = { name: "vadonut", description: "pan raas" };

    dboper
      .insertDocument(db, dish, "dishes")
      .then(res => {
        console.log("Insert Document\n", res.ops);

        return dboper.findDocuments(db, "dishes");
      })
      .then(docs => {
        console.log("Found documents:\n", docs);

        return dboper.updateDocument(
          db,
          { name: "vadonut" },
          { description: "Pan masala" },
          "dishes"
        );
      })
      .then(res => {
        console.log("Updated Document: \n", res.result);

        return dboper.findDocuments(db, "dishes");
      })
      .then(docs => {
        console.log("Found updated documents:\n", docs);

        return db.dropCollection("dishes");
      })
      .then(res => {
        console.log("Dropped collection: ", res);

        return client.close();
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
