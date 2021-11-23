const db = require("./db");

//Getting users and his/her role from db using email
module.exports.get_users_by_email_from_db = async function (email) {
    return await db('users').select(['email','role'])
    .where('email', email)
    .then(res => res)
    .catch(err => console.log(err));
}