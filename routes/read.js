var express = require("express");
var userModule = require("../userModule.js");
var mongodb = require("../mongodb.js");
var router = express.Router();

router.get("/:_id", async (req, res) => {
  await mongodb.readArticle("readContant", req.params._id).then((result) => {
    res.render("read", {
      title: result[0].title,
      view: result[0].views,
      star: result[0].star,
      contents: result[0].contents,
    });
  });
});

module.exports = router;
