const express = require("express");
const { get_winner } = require("../controller/winner.controller");
const router = express.Router();

router.get("/all", get_winner)

module.exports = router;