var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id: 0, username: "SmartDevice1. Status - ON"},
    {id:1, username: "SmartDevice2. Status - OFF"}
  ]);
});

module.exports = router;
