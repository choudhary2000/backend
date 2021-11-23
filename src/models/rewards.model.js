class REWARDS {
    constructor(db) {
        this.db = db;
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS rewards (
            event_id INTEGER REFERENCES events(event_id),
            rank INTEGER NOT NULL,
            reward VARCHAR(100),
            Unique(event_id, rank)
        )`
        return this.db.run(sql, (err, r) => {
            if(err) {
                console.log(err)
            }
        });
    }

    create(params) {
        return this.db.run('INSERT INTO rewards (event_id, rank, rewards) VALUES (?, ?, ?)',[params.event_id, params.rank, params.reward]);
    }

    // update_status(status, event_id) {
    //     return this.db.run('update rewards SET event_type = ? where id = ?', [status, event_id]);
    // }
}
module.exports = REWARDS;  
