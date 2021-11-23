const db = require("./db");

module.exports.get_events_by_date = async function (op, date) {
    return await db.select(['e.event_id', 'e.name', 'e.type as event_type', 'e.event_date', db.raw('JSON_AGG(r.*) as reward')]).from('events as e')
    .leftJoin('rewards as r', 'e.event_id', 'r.event_id')
    .where('e.event_date', op, date)
    .groupBy('e.event_id');
}

module.exports.get_events_by_date = async function (op, date, type) {
    return db.select(['e.event_id', 'e.name', 'e.type as event_type', 'e.event_date', npdb.raw('JSON_AGG(r.*) as reward')]).from('events as e')
    .leftJoin('rewards as r', 'e.event_id', 'r.event_id')
    .where(function () {
        this.where('event_date', op, date)
        .andWhere("type", type)
    })
    .groupBy('e.event_id');
}

module.exports.update_events_status = async function(event_id, status) {
    return await db('events')
    .update('status', status)
    .where('event_id', event_id)
    .then(res => "done")
}

module.exports.insert_event = async function (event) {
    return await db('events')
    .insert(event)
    .returning('id')
    .then(res => res);
}
