var express = require("express");
var router = express.Router();
var userModule = require("../userModule.js");

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/data", async (req, res) => {
  res.send(await userModule.fileLoad("Notice"));
});

router.get("/main", async (req, res) => {
  res.send(await userModule.dataLoad("Lorem Ipsum"))
})

module.exports = router;
