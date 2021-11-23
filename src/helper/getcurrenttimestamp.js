function get_current_datetime() {
    let x = new Date()
    return x.toISOString()
}

module.exports = { get_current_datetime };