const Joi = require("joi");
module.exports.isString = async function(data) {
    try {
        const schema = Joi.object({
            data: Joi.string().required()
        })
        await schema.validateAsync({data: data});
        return data;  
    } catch (error) {
        throw error;
    }
}