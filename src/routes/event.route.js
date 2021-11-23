const express = require("express");
const router = express.Router();
const { get_future_events, create_event } = require("../controller/event.controller");

router.get("/upcoming_event", get_future_events);

router.post("/create-event", create_event);

module.exports = router;