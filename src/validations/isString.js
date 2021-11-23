const Joi = require("joi");
module.exports.isString = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().required()
        })
        return await schema.validateAsync({data: data});   
    } catch (error) {
        throw error;
    }
}