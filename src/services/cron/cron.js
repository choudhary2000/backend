const { get_events_which_schedule, get_participants_of_a_event, insert_winners_into_table } = require('../../db/cron.db');
const { update_events_status } = require('../../db/event.db');


class GenerateWinner {
    constructor(type) {
        this.type = type;
        this.is_all_event_processed = true;
    }

    get_winners = (participates, k) => {
        const len = Math.min(participates.length, k);
        const w = participates.sort(() => (Math.random() - Math.random())).slice(0, len);  
        for(let i = 0; i < len; i++) {
            w[i]["rank"] = i+1;
        }
        return w;
    }

    processed_one_event =  async (event) => {
        return new Promise(async(resolve, reject) => {
            try {
                const event_id = event.event_id;
                const winners_count = event.winners;
                if(!event_id) {
                    throw new Error('event id must required!');
                }

                if(!winners_count) {
                    throw new Error('winners number must be required');
                }

                const participants = await get_participants_of_a_event(event_id);
                const winners = this.get_winners(participants, winners_count);
                const mes1 = await insert_winners_into_table(winners);
                const mes2 = await update_events_status(event_id, 'DECLARED');
                resolve('ok');
                
            } catch (error) {
                this.is_all_event_processed = false;
                console.log(error)
                reject(null)
            }
        })
    }

    winners = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const events = await get_events_which_schedule()
                await Promise.all(events.map((event) => this.processed_one_event(event)))
                .then(res => {
                    resolve(this.is_all_event_processed);
                });
            } catch (error) {
                console.log(error);
                reject(null)
            }
        });
    }
}
module.exports = GenerateWinner;