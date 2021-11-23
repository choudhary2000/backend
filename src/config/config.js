const dotenv = require('dotenv');
dotenv.config()
module.exports = {
    PORT: process.env.PORT,
    DIALECT: process.env.DIALECT,
    STORAGE: process.env.STORAGE
}