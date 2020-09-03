var express = require("express");
var userModule = require("../userModule.js");
var router = express.Router();

/* GET users listing. */
router.post("/introText", async (req, res) => {
  res.json(await userModule.randomTextLoad("Lorem Ipsum"));
});

router.post("/notice", async (req, res) => {
  res.send(await userModule.fileLoad("Notice"));
});

router.post("/writing", async (req, res) => {
  res.send(await userModule.fileLoad("Writing"));
});

router.post("/picture", async (req, res) => {
  res.send(await userModule.fileLoad("Picture"));
});

module.exports = router;
