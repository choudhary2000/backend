const Joi = require("joi");

const schema_allow_null = Joi.object({
    a: Joi.number().allow(null)
});

const schema_strict = Joi.object({
    a: Joi.number().required()
});

module.exports.isIntegerOrNull = async function(a) {
    try {
        const value = await schema_allow_null.validateAsync({a: a});
        return a;
    } catch (error) {
        throw error;
    }
}

module.exports.isInteger = async function(a) {
    try {
        const value = await schema_strict.validateAsync({a: a})
        return a;
    } catch (error) {
        throw error;
    }
}
