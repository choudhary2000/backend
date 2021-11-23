//This operator direction are compatible with knex query
function get_operator(op_str) {
    if(op_str === "less") {
        return "<";
    }

    if(op_str === "greater") {
        return ">";
    }

    if(op_str === "equalto") {
        return "=";
    }

    if(op_str == "less_equalto") {
        return "<="
    }

    if(op_str == "greater_equalto") {
        return ">="
    }
    return ">"
}

module.exports = { get_operator };