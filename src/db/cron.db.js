const db = require("./db");
const { get_current_datetime } = require("../helper/getcurrenttimestamp");

module.exports.get_events_which_schedule = async function() {
    
    const curr_date = get_current_datetime();

    return await db.select(['id as event_id', 'status', 'event_date'])
    .from('events').where('event_date', '<=', curr_date)
    .andWhere('status', 'NOT_DECLARED');
}

module.exports.get_participants_of_a_event = async function(event_id) {
    return await db.select('event_id', 'ticket')
    .from('participations')
    .where('event_id', event_id); // need to use user id also
}

module.exports.insert_winners_into_table = async function(winners) {
    return await db('winners').insert(winners)
    .then(res => "ok")
    .catck(err => {
        throw err;
    })
}
