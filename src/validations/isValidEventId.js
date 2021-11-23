const Joi = require("joi");

module.exports.isValidEventId = async function(event_id) {
    try {
        const schema = Joi.object({
            event_id: Joi.number().min(1).required()
        })
        await schema.validateAsync({event_id: event_id});
        return event_id;
    } catch (error) {
        throw error;
    }
}