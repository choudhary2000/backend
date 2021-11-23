const express = require("express");
const { get_tickets_of_a_event, ticket_buy } = require("../controller/ticket.controller");
const router = express.Router();

router.get("/tickets", get_tickets_of_a_event);

router.post("/buy-ticket", ticket_buy)

module.exports = router;