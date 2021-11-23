module.exports.get_firstday_month = function () {
    try {
        let curr = new Date();
        let last = curr.getDate() - curr.getDay();
        let start = last - 30;
        let lastday = new Date(curr.setDate(start)).toLocaleDateString();
        return lastday;
    } catch (error) {
        throw error;
    }
} 
