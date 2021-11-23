const Joi = require("joi");

module.exports.isValidEventType  = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().valid('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'BIG').insensitive()
        });
        await schema.validateAsync({data: data});
        return data;
    } catch (error) {
        throw error;
    }
}