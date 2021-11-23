const { get_firstday_month } = require("./getfirstdayofmonth");
const { get_firstday_week } = require("./getfirstdayofweek");
const { get_firstday_year } = require("./getfirstdayofyear");

module.exports.get_first_day = function(by) {
    try {
        if(by === "week") {
            return get_firstday_week();
        }
        
        if(by === "month") {
            return get_firstday_month();
        }

        if(by === "year") {
            return get_firstday_year()
        }
        return get_firstday_year()
    } catch (error) {
        throw error;
    }
}