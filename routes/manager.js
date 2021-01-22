const { json } = require("body-parser");
var express = require("express");
var mongodb = require("../mongodb.js");
var router = express.Router();



/* GET users listing. */

// router.post("/documenttitle", async (req, res) => {
//   res.send(await mongodb.readDocumentTitle("blog_post", req.body.collection));
// });

// router.post("/document", async (req, res) => {
//   res.send(
//     await mongodb.readDocument("blog_post", req.body.collection, req.body.id)
//   );
// });

router.post("/createPost", async (req, res) => {

  res.json(await mongodb.creatPost(req.body));
});

router.post("/home", async (req, res) => {
  switch (req.body.source) {
    case "article":
      res.json(await mongodb.readArticle(req.body.type));
      break;
    case "comment":
      res.json(await mongodb.readComment(req.body.type));
      break;
    default:
  }
});

router.post("/resource", async (req, res) => {
  res.send(await mongodb.readResource(req.body.type, req.body.name));
});

module.exports = router;
