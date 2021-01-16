const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/blog"; //데이터베이스 주소
var ObjectId = require("mongodb").ObjectID;

/*몽고 데이터 베이스에 접근하기 위한 클라이언트 객체의 프로미스를 전달한다.*/
const creatClient = async () => {
  return new Promise(async (resolve, reject) => {
    return resolve(
      new MongoClient(uri, {
        useUnifiedTopology: true,
      })
    );
  });
};

/*게시글을 읽기 위한 메소드 
요청한 글의 키값과 타입값을 요청 받으며 그 게시물의 데터이를 
각각의 타입에 맞취 전달한다.*/
const readArticle = async (type, id) => {
  return creatClient()
    .then((client) => {
      return client.connect();
    })
    .then(async (client) => {
      switch (type) {
        case "bestPost": //가장 많이 읽은 게시물의 기준으로 최대 5개의 게시물의 데이터를 전달한다.
          return await client
            .db("blog")
            .collection("article")
            .find({})
            .sort({ views: -1 })
            .limit(5)
            .toArray()
            .then((result) => {
              client.close();
              return result;
            });
        case "recentPostList": //최근 게시물의 데이터를 전달한다.
          return await client
            .db("blog")
            .collection("article")
            .find({}, { projection: { contents: 0 } })
            .sort({ date: -1 })
            .toArray()
            .then((result) => {
              client.close();
              return result;
            });
        case "readContant":
          return await client
            .db("blog")
            .collection("article")
            .find(
              { _id: ObjectId(id) },
              { projection: { _id: 0, category: 0, thumbnail: 0 } }
            )
            .toArray()
            .then((result) => {
              client.close();
              return result;
            });
        default:
      }
    });
};
/*
댓글을 읽기 위한 메소드
type이라는 값을 요청받으며 그 값에 맞는 데이터를 클라이언트에게 전달
*/
const readComment = async (type) => {
  return creatClient()
    .then((client) => {
      return client.connect();
    })
    .then(async (client) => {
      switch (type) {
        case "recent": //최근 댓글 10개를 선정하여 데이터를 전달한다.
          return await client
            .db("blog")
            .collection("comment")
            .find({})
            .sort({ date: 1 })
            .limit(10)
            .toArray()
            .then((result) => {
              client.close();
              return result;
            });
        default:
      }
    });
};
/*클라이언트에서 작성한 포스터를 기반으로 데이터베이스에 도큐먼트를 전달하는 메소드*/

/*추가 사항 카테고리에 따라 다르게 저장 되도록 값을 전달받고 처리하자*/
const creatPost = async (newListings, category) => {
  return creatClient()
    .then((client) => {
      return client.connect();
    })
    .then(async (client) => {
      return client
        .db("blog_post")
        .collection(category)
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

/*현제 데이터 베이스에 있는 콜렉션을 반환하는 메소드.*/
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

/*선택한 도큐먼트의 데이터를 반환하는 메소드*/
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

/*선택한 콜렉션의 데이터를 반환하는 메소드*/
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

// const readResource = async (type, fileName) => {
//   return creatClient()
//     .then((client) => {
//       return client.connect();
//     })
//     .then(async (client) => {
//       return await client
//         .db("manager")
//         .collection("resource")
//         .find(
//           { type: type, name: fileName },
//           { projection: { _id: 0, type: 0, name: 0 } }
//         )
//         .toArray()
//         .then((result) => {
//           client.close();
//           console.log(result[0].resource);
//           return result[0].resource;
//         });
//     });
// };

module.exports = {
  readComment: readComment,
  readArticle: readArticle,
  creatPost: creatPost,
  readCollection: readCollection,
  readDocument: readDocument,
  readDocumentTitle: readDocumentTitle,
  // readResource: readResource,
};
