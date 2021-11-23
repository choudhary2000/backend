const Joi = require("joi");
module.exports.isValidDuration = async function(by) {
    try {
        const schema = Joi.object({
            by: Joi.string().valid("week", "month", "year", "all").insensitive().allow(null)
        });
        await schema.validateAsync({by: by});
        return by;
    } catch (error) {
        throw error;
    }
}