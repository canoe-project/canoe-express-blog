const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://canoe:2STs9htj84NwkXzg@cluster0.aeq0z.mongodb.net/blog_post?retryWrites=true&w=majority";
var ObjectId = require("mongodb").ObjectID;
const creatClient = async () => {
  return new Promise(async (resolve, reject) => {
    return resolve(
      new MongoClient(uri, {
        useUnifiedTopology: true,
      })
    );
  });
};

const creatPost = async (newListings) => {
  return creatClient()
    .then((client) => {
      return client.connect();
    })
    .then(async (client) => {
      return client
        .db("blog_post")
        .collection("notice")
        .insertOne(newListings)
        .then((result) => {
          client.close();
          return result;
        });
    })
    .then((result) => {
      return `${result.insertedCount} new listing(s) created with the following id(s):`;
    });
};

// const readMongo = async () => {
//   let list = [];
//   return await client
//     .connect()
//     .then(async (client) => {
//       return await client.db().admin().listDatabases();
//     })
//     .then(async (dblist) => {
//       console.log(dblist.databases);
//       dblist.databases.map(async (database) => {
//         list.push(database.name);
//       });
//     })
//     .then(() => {
//       return list;
//     });
// };

const readCollection = async (dbName) => {
  return creatClient()
    .then((client) => {
      return client.connect();
    })
    .then(async (client) => {
      return await client
        .db(dbName)
        .listCollections()
        .toArray()
        .then((result) => {
          client.close();
          return result;
        });
    });
};

const readDocument = async (dbName, collection, tilteID) => {
  return creatClient()
    .then((client) => {
      return client.connect();
    })
    .then(async (client) => {
      return await client
        .db(dbName)
        .collection(collection)
        .find(
          { _id: ObjectId(tilteID) },
          { projection: { contents: 1, _id: 0 } }
        )
        .toArray()
        .then((result) => {
          client.close();
          return result;
        });
    });
};

const readDocumentTitle = async (dbName, collection) => {
  return creatClient()
    .then((client) => {
      return client.connect();
    })
    .then(async (client) => {
      return await client
        .db(dbName)
        .collection(collection)
        .find({}, { projection: { contents: 0 } })
        .toArray()
        .then((result) => {
          client.close();
          return result;
        });
    });
};

module.exports = {
  creatPost: creatPost,
  readCollection: readCollection,
  readDocument: readDocument,
  readDocumentTitle: readDocumentTitle,
};
