class EVENT {
    constructor(db) {
        this.db = db;
    }

    create(params) {
        return this.db.run('INSERT INTO projects (name, event_type, status, annocement_datetime) VALUES (?, ?, ?, ?)',[params.name, params.event_type, params.status, params.annocement_datetime]);
    }

    update_status(status, event_id) {
        return this.db.run('update events SET event_type = ? where id = ?', [status, event_id]);
    }

    get_event_by_id(id) {
        const sql = `select E.event_id, E.name, E.event_type, E.status, E.event_date,
        R.rank, R.reward from events as E left join rewards as R on E.event_id = R.event_id where E.event_id = ?`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [id], (err, res) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(res || []);
                }
            })
        });
    }

    get_by_all(id, type, status, date) {
        const sql = `select E.event_id, E.name, E.event_type, E.status, E.event_date,
        R.rank, R.reward from events as E left join rewards as R on E.event_id = R.event_id where E.event_id = ? and E.event_type = ? and E.status = ? and E.event_date = ?`;
        return new Promise((resolve, reject) => {
            this.db.get(sql, [id, type, status, date], (err, res) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(res || []);
                }
            })
        });
    }

    get_all() {
        const sql = `select E.event_id, E.name, E.event_type, E.status, E.event_date,
        R.rank, R.reward from events as E left join rewards as R on E.event_id = R.event_id where  E.event_date >= date('Now')`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, res) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(res || []);
                }
            })
        });
    }


    get_event_by_date(id) {
        const sql = `select E.event_id, E.name, E.event_type, E.status, E.event_date,
        R.rank, R.reward from events as E left join rewards as R on E.event_id = R.event_id where E.event_date = ?`;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [date], (err, res) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(res || []);
                }
            })
        });
    }

    get_by_type(event_type) {
        const sql = `select E.event_id, E.name, E.event_type, E.status, E.event_date,
        R.rank, R.reward from events as E left join rewards as R on E.event_id = R.event_id where E.event_type = ?`;
        return new Promise((resolve, reject) => {
            this.db.all(sql,[event_type], (err, res) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(res || []);
                }
            })
        });
    }

    get_by_status(status) {
        const sql = `select E.event_id, E.name, E.event_type, E.status, E.event_date,
        R.rank, R.reward from events as E left join rewards as R on E.event_id = R.event_id where E.status = ?`;
        return new Promise((resolve, reject) => {
            this.db.all(sql,[status], (err, res) => {
                if(err) {
                    return reject(err);
                } else {
                    resolve(res || []);
                }
            })
        });
    }
}

module.exports = EVENT;  
