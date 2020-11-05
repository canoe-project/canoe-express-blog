var express = require("express");
var mongodb = require("../mongodb.js");
var router = express.Router();

/* GET users listing. */

router.post("/create", async (req, res) => {
  console.log(await mongodb.creatPost(req.body));
});

router.post("/documentlist", async (req, res) => {
  res.send(await mongodb.readDocument("blog_post", req.body.collection));
});

router.get("/mongolist", async (req, res) => {
  res.send(await mongodb.readMongo());
});

router.get("/collectionlist", async (req, res) => {
  res.send(await mongodb.readCollection("blog_post"));
});

router.get("/document", async (req, res) => {
  await mongodb.readDocument("blog_post", "notice");
});

module.exports = router;
