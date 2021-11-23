const Joi = require("joi");
module.exports.isAlphanumeric = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().alphanum().min(1).max(15).insensitive().required()
        })
        await schema.validateAsync({data: data});
        return data;
    } catch (error) {
        throw error;
    }
}