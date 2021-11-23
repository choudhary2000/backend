module.exports.get_firstday_year = function () {
    try {
        let curr = new Date();
        let last = curr.getDate() - curr.getDay();
        let start = last - 365;
        let lastday = new Date(curr.setDate(start)).toLocaleDateString();
        return lastday;
    } catch (error) {
        throw error;
    }
} 
