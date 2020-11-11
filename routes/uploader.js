var express = require("express");
var mongodb = require("../mongodb.js");
var router = express.Router();

/* GET users listing. */

router.post("/create", async (req, res) => {
  console.log(await mongodb.creatPost(req.body));
});

router.post("/documenttitle", async (req, res) => {
  res.send(await mongodb.readDocumentTitle("blog_post", req.body.collection));
});

router.post("/document", async (req, res) => {
  res.send(
    await mongodb.readDocument("blog_post", req.body.collection, req.body.id)
  );
});

module.exports = router;
