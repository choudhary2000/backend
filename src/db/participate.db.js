const db = require("./db");

module.exports.create_a_participate_for_the_event = async function(email, event_id, ticket_no) {
    const participate = {
        "email": email,
        "event_id": event_id,
        "ticket": ticket_no
    }

    return await db('participations')
    .insert(participate)
    .returning("ticket")
    .then(res => {
        return {success: true, message: res}
    })
    .catch(err => { 
        if(err.constraint === "participations_event_id_user_id_unique") {
            return {success: false, message: err.detail};
        }
        return err;
    });
}