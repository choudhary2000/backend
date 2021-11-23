const { STORAGE } = require("../config/config");
const sqlite3 = require("sqlite3").verbose();
const EVENT = require("./event.model");
const REWARDS = require("./rewards.model");


const db = new sqlite3.Database('../db/database.db', (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log('connected to db.')
    }
})


db.run(`
    CREATE TABLE IF NOT EXISTS events (
        event_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        event_type VARCHAR(25) CHECK (event_type IN ('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')) NOT NULL,
        status VARCHAR(25) CHECK (status IN ('DECLARED', 'NOT_DECLARED')) NOT NULL,
        event_date TIMESTAMP NOT NULL
    );

    CREATE TABLE IF NOT EXISTS rewards (
        event_id INTEGER REFERENCES events(event_id),
        rank INTEGER NOT NULL,
        reward VARCHAR(100),
        Unique(event_id, rank)
    );
`, (err, r) => {
    if(err) {
        console.log(err)
    }
})


db.all("select * from events", (e,r)=>console.log(r))

tables = {}
tables.db = db;
tables.event = new EVENT(db);
tables.rewards = new REWARDS(db)
tables.event.get_event_by_id(1)

// db.get('select * from events', (err, r) => {console.log(r)})
// db.run('insert into events (name, event_type, status, event_date) values ("IITK","MONTHLY" ,"NOT_DECLARED", date("now"))', (err, r) => console.log(err, r))
// db.run('insert into rewards (event_id, rank, reward) values (2,3,"Honda")', (err, r) => console.log(err, r))



// db.get(`select E.event_id, E.name, E.event_type, E.status, E.event_date,
// R.rank, R.reward from events as E left join rewards as R on E.event_id = R.event_id where E.event_id = 1`, (err, r) => {
//     console.log(err, r)
// })

module.exports = tables;
