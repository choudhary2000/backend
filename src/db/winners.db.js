const db = require("./db");
module.exports.get_winners_from_db = async function(start_date) {
    return await db('events as e').select("*")
    .leftJoin('winners as w', 'e.event_id', 'w.event_id')
    .leftJoin('participations as p', function () {
        this.on('p.event_id', '=', 'w.event_id')
        .on('p.ticket', '=', 'w.ticket')
    })
}