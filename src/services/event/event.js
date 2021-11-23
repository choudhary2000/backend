
const tables = require("../../models/index");
class EventDetails {
    async get_by_id(event_id) {
        return new Promise( async(resolve, reject) => {
            tables.event.get_event_by_id(event_id).
            then(r => resolve(r))
           .catch(err => reject(err));
        })
   }
   
   async get_by_date(date) {
       return new Promise(async(resolve, reject) => {
           tables.event.get_by_date(date)
           .then(r => resolve(r))
           .catch(e => reject(e));
       })
   }

   async get_by_status(status) {
        return new Promise(async(resolve, reject) => {
            tables.event.get_by_status(status)
            .then(r => resolve(r))
            .catch(e => reject(e));
        })
    }

    async get_by_type(event_type) {
        return new Promise(async(resolve, reject) => {
            tables.event.get_by_type(event_type)
            .then(r => resolve(r))
            .catch(e => reject(e));
        })
    }

    async get_by_all(type, id, date, status) {
        return new Promise(async(resolve, reject) => {
            tables.event.get_by_all(id, type, status, date)
            .then(r => resolve(r))
            .catch(e => reject(e));
        })
    }

    async get_all() {
        return new Promise(async(resolve, reject) => {
            tables.event.get_all()
            .then(r => resolve(r))
            .catch(e => reject(e));
        })
    }
}

module.exports = EventDetails