const Joi = require("joi");

module.exports.isValidEventStatus  = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().valid(['DECLARED', 'NOT_DECLARED', 'INVALID']).insensitive().allow(undefined)
        });
        return await schema.validateAsync({data: data});
    } catch (error) {
        throw error;
    }
}