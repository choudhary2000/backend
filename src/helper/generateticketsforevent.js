const { generate_strings_set } = require("./generatestringset");
const { get_ticket_length } = require("./getticketlength");

module.exports.generate_ticket_for_an_event = function (number_of_ticket, event_id) {
    const ticket_len =  get_ticket_length(number_of_ticket);
    const ticket_set  = generate_strings_set(number_of_ticket, ticket_len);

    let itr = ticket_set.values();
    let tickets = [];
    for( let i = 0; i < ticket_set.size; i++) {
        tickets[i] = {"event_id": event_id, "ticket_no": itr.next().value};
    }
    
    return tickets;
}
