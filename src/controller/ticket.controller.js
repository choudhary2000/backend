const { default: ModelManager } = require("sequelize/dist/lib/model-manager");
const { create_a_participate_for_the_event } = require("../db/participate.db");
const { get_tickets_of_event_from_db } = require("../db/tickets.db");
const { isAlphanumeric } = require("../validations/isAlphaNumeric");
const { isInteger, isIntegerOrNull } = require("../validations/isInteger");

module.exports.get_tickets_of_a_event = async function (req, res, next) {
    try {
        const event_id =  await isInteger(req.query.event_id);
        let ticket_state = req.query.state;
        
        if(ticket_state && (ticket_state === "SOLD" || ticket_state === "NOT_SOLD")) {
            ticket_state = Array(ticket_state);
        } else {
            ticket_state = ['SOLD', 'NOT_SOLD'];
        }

        // Pagination preparation
        const per_page = await isIntegerOrNull(req.query.per_page) || 10;
        const page = await isIntegerOrNull(req.query.page) || 1;

        if(page < 0) {
            page = 1;
        }

        const offset = (page - 1)*per_page;
        //Extracting data from db
        const tickets = await get_tickets_of_event_from_db(event_id, ticket_state,  offset, per_page, page);
        res.status(200).send(tickets);
    } catch (error) {
        next(error);
    }
}

module.exports.ticket_buy = async function(req, res, next) {
    try {
        const event_id = await isInteger(req.body.event_id);
        const user_id = await isInteger(req.body.user_id);
        const ticket_no = await isAlphanumeric(req.body.ticket_no);

        //Check is user already buy ticket for the event and If not then creating an entry
        const data = await create_a_participate_for_the_event(user_id, event_id, ticket_no);
        if(data.success) {
            return res.status(200).send(`User: ${user_id} successful purchased ticket: ${data.message} for the event: ${event_id}`);
        } else {
            return res.status(400).send(data.message);
        }
    } catch (error) {
        next(error);
    }
}