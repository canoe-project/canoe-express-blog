const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://canoe:2STs9htj84NwkXzg@cluster0.aeq0z.mongodb.net/blog_post?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  poolSize: 2,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});

const creatPost = async (newListings) => {
  return await client
    .connect()
    .then(async (client) => {
      return client.db("blog_post").collection("notice").insertOne(newListings);
    })
    .then((result) => {
      return `${result.insertedCount} new listing(s) created with the following id(s):`;
    });
};

const readMongo = async () => {
  let list = [];
  return await client
    .connect()
    .then(async (client) => {
      return await client.db().admin().listDatabases();
    })
    .then(async (dblist) => {
      console.log(dblist.databases);
      dblist.databases.map(async (database) => {
        list.push(database.name);
      });
    })
    .then(() => {
      return list;
    });
};

const readCollection = async (dbName) => {
  return await client.connect().then(async (client) => {
    return await client.db(dbName).listCollections().toArray();
  });
};

const readDocument = async (dbName, collection) => {
  return await client.connect().then(async (client) => {
    return await client.db(dbName).collection(collection).find().toArray();
  });
};

module.exports = {
  creatPost: creatPost,
  readMongo: readMongo,
  readCollection: readCollection,
  readDocument: readDocument,
};
