const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log("Connected");

  const db = client.db(dbname);

  dboper.insertDocument(
    db,
    { name: "vadonut", description: "pan raas" },
    "dishes",
    res => {
      console.log("Insert Document\n", res.ops);
      dboper.findDocuments(db, "dishes", docs => {
        console.log("Found documents:\n", docs);

        dboper.updateDocument(
          db,
          { name: "vadonut" },
          { description: "Pan masala" },
          "dishes",
          res => {
            console.log("Updated Document: \n", res.result);
            dboper.findDocuments(db, "dishes", docs => {
              console.log("Found updated documents:\n", docs);

              db.dropCollection("dishes", res => {
                console.log("Dropped collection: ", res);
                client.close();
              });
            });
          }
        );
      });
    }
  );
});
