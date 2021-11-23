const db = require("./db");
module.exports.insert_rewards_of_an_event = async function(rewards, event_id) {
    let new_rew = []
    for(let i = 0; i < rewards.length; i++) {
        let t = {}
        t["rank"] = rewards[i]["rank"];
        t["reward"] = rewards[i]["reward"];
        t["event_id"] = event_id;
        new_rew[i] = t;
    }   
    return await db('rewards').insert(new_rew)
    .then(res => res);
}
