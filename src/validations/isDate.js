const Joi = require("joi");
const { get_date } = require("../helper/getcurrentdate");

module.exports.isDate = async function (date) {
    try {
        const schema = Joi.object({
            date: Joi.date().min(get_date())
        })
        await schema.validateAsync({date: date});
        return date;
    } catch (error) {
        throw error;
    }
}