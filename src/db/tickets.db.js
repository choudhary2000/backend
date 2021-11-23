const db = require("./db");

module.exports.insert_tickets_of_an_event = async function(tickets) {
    return await db('tickets').insert(tickets)
    .then(res => res);
}

module.exports.get_tickets_of_event_from_db = async function(event_id, ticket_state, offset, per_page, page) {
    return await db('tickets')
    .select(['event_id', 'ticket_no', 'ticket_state'])
    .where('event_id', event_id)
    .whereIn('ticket_state', ticket_state)
    .offset(offset)
    .limit(per_page)
    .then((res) => {
        paginations = {};
        paginations.per_page = per_page;
        paginations.offset = offset;
        paginations.current_page = page;
        paginations.data = res;
        return paginations;
    });
}