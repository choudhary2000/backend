const Joi = require("joi");
const { get_date } = require("../helper/getcurrentdate");

module.exports.isDate = async function (date) {
    try {
        const schema = Joi.object({
            date: Joi.date().min(get_date())
        })
        return await schema.validateAsync({date: date})
    } catch (error) {
        throw error;
    }
}