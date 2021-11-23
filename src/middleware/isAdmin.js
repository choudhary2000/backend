const { get_users_by_email_from_db } = require("../db/user.db");
const { isEmail } = require("../validations/isemail");

 module.exports.isAdmin = async function(req, res, next) {
     try {
        const email = await isEmail(req.body.email);
        const user = await get_users_by_email_from_db(email);
        if(user.length != 1 || user[0].role !== "ADMIN") {
            return res.status(401).send({errorMessage: "Unauthorized request!"});
        }
        next();
     } catch (error) {
        next(error);
     }
 } 