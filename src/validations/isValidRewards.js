const { ValidationError } = require("joi");
module.exports.isValidRewads = async function(rewards, winners) {
    try {
        if(String(rewards.length) !== String(winners)) {
            throw new ValidationError("Enter required number of rewards");
        }
        return rewards;
    } catch (error) {
        throw error;
    }
}