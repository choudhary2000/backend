module.exports.get_ticket_length = function (number_of_ticket) {
    return Math.ceil(Math.log(number_of_ticket)/Math.log(62)); // total alphanumeric characters is 62
}
