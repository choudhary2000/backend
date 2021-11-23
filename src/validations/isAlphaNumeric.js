const Joi = require("joi");
module.exports.isAlphanumeric = async function(data) {
    try {
        const schema = Joi.object({
            ticket_no: Joi.string().alphanum().min(1).max(15).insensitive().required()
        })
        await schema.validateAsync({ticket_no: data});
        return data;
    } catch (error) {
        throw error;
    }
}