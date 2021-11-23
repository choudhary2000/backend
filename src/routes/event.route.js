const express = require("express");
const router = express.Router();
const { get_future_events, create_event } = require("../controller/event.controller");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/upcoming_event", get_future_events);

router.post("/create-event", isAdmin, create_event);

module.exports = router;