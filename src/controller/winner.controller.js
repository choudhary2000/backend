const { get_first_day } = require("../helper/getstartdayforwinner");
const { isIntegerOrNull } = require("../validations/isInteger");
const { isValidDuration } = require("../validations/isValidDuration")

module.exports.get_winner = async function(req, res, next) {
    try {
        const by = await isValidDuration(req.query.by) || "week";
        const page = await isIntegerOrNull(req.query.page) || 1;
        const per_page = await isIntegerOrNull(req.query.per_page) || 10;

        if(page < 1) {
            page = 1;
        }

        if(per_page < 10) {
            per_page = 10;
        }

        const offset = (page - 1)*per_page;
        // getting first day of week , month or year for example start date of week 22/11/2021 is 15/11/2021 similay for month and year
        const start_date = get_first_day(by);


    } catch (error) {
        
    }
}