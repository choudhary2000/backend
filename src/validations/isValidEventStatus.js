const Joi = require("joi");

module.exports.isValidEventStatus  = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().valid('DECLARED', 'NOT_DECLARED', 'INVALID').insensitive().allow(undefined)
        });
        await schema.validateAsync({data: data});
        return data;
    } catch (error) {
        throw error;
    }
}