const { get_first_day } = require("../helper/getstartdayforwinner");
const db = require("./db");
module.exports.get_winners_from_db = async function(start_date, offset, page, per_page) {
    return await db('events as e').select(['e.id', 'e.name', 'e.status', 'e.type',
    db.raw(`JSON_AGG(JSON_BUILD_OBJECT(
        'rank', w.rank,
        'ticket', w.ticket,
        'email', p.email
    )) as winners`)])
    .leftJoin('winners as w', 'e.id', 'w.event_id')
    .leftJoin('participations as p', function () {
        this.on('p.event_id', '=', 'w.event_id')
        .on('p.ticket', '=', 'w.ticket')
    })
    .where('e.event_date','>=',start_date)
    .where('e.status', 'DECLARED')
    .groupBy('e.id')
    .offset(offset)
    .limit(per_page)
    .then(res => {
        let pagin = {}
        pagin.data = res;
        pagin.offset = offset;
        pagin.page_no = page;
        pagin.per_page = per_page;
        return pagin
    })
    .catch(err => err)
}
