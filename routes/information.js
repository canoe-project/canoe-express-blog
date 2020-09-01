var express = require("express");
var userModule = require("../userModule.js");
var router = express.Router();

/* GET users listing. */
router.get("/notice", async (req, res) => {
  res.send(await userModule.fileLoad("Notice"));
});

router.get("/introText", async (req, res) => {
  res.json(await userModule.randomTextLoad("Lorem Ipsum"));
});

module.exports = router;
