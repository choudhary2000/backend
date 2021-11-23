const Joi = require("joi");

module.exports.isValidEventType  = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().valid(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'BIG']).insensitive()
        });
        return await schema.validateAsync({data: data});
    } catch (error) {
        throw error;
    }
}