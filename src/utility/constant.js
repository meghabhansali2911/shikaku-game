const dotenv = require("dotenv").config({ path: ".env" });

const CONSTANT = {
    DB_URL: process.env.DB_URL,
    NODE_PORT: process.env.NODE_PORT
}


module.exports = CONSTANT;