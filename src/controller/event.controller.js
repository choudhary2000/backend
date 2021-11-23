const { generate } = require('randomstring');
const { get_events_by_date, get_events_by_date_n_type, insert_event } = require('../db/event.db');
const { get_current_datetime  } = require("../helper/getcurrenttimestamp");
const { get_operator } = require("../helper/getlessgreateroperator");
const { generate_ticket_for_an_event } = require('../helper/generateticketsforevent');
const { insert_tickets_of_an_event } = require('../db/tickets.db');
const { isIntegerOrNull, isInteger } = require('../validations/isInteger');
const { isDate } = require('../validations/isDate');
const { isString } = require('../validations/isString');
const { isValidEventStatus } = require('../validations/isValidEventStatus');
const { get_date } = require('../helper/getcurrentdate');
const { isValidEventType } = require('../validations/isValidEventType');
const { isValidRewads } = require('../validations/isValidRewards');
const { insert_rewards_of_an_event } = require('../db/rewards.db');

module.exports.get_future_events = async function (req, res, next) {
    try {
        const event = await isValidEventStatus(req.query.event_type);
        const date = get_date();
        const operator = ">=";

        if(event) {
            const data = await get_events_by_date_n_type(operator, date, event)
            return res.status(200).send(data)
        } else {
            const data = await get_events_by_date(operator, date)
            return res.status(200).send(data);
        }
    } catch (error) {
       next(error) 
    }
}


module.exports.create_event = async function (req, res, next) {
    try {
        const event_name = await isString(req.body.event_name);
        const event_type = await isValidEventType(req.body.event_type);
        const event_date = await isDate(req.body.event_date);
        const event_limit = await isInteger(req.body.event_limit);
        const event_winners = await isInteger(req.body.event_winners);
        let rewards = await isValidRewads(req.body.rewards, event_winners);
        
        const event =  {};
        event.name = event_name;
        event.type = event_type;
        event.status = 'NOT_DECLARED',
        event.winners = event_winners;
        event.event_date = event_date;
        event.limits = event_limit
        // inserting events meta data into the events table
        const [ event_id ] = await insert_event(event);
        //creating tickets for the events
        const tickets = generate_ticket_for_an_event(event_limit, event_id);
        //inserting tickets into the tables
        await insert_tickets_of_an_event(tickets);
        await insert_rewards_of_an_event(rewards, event_id)

        res.status(200).send("events successfully created!");
    } catch (error) {
        next(error);
    }
}
