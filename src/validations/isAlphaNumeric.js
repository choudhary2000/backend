const Joi = require("joi");
module.exports.isAlphanumeric = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().alphanum().min(1).max(15).insensitive().required()
        })
        return await schema.validateAsync({data: data});
    } catch (error) {
        throw error;
    }
}