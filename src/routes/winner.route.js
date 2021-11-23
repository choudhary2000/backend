const express = require("express");
const { get_winner, get_winner_by_event_id } = require("../controller/winner.controller");
const router = express.Router();

router.get("/by-event_id", get_winner_by_event_id);
router.get("/", get_winner);

module.exports = router;