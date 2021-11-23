const Joi = require("joi");

module.exports.isEmail = async function (email) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required()
        });
        await schema.validateAsync({email: email});
        return email;
    } catch (error) {
        throw error;   
    }
}