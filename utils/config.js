require("dotenv").config()

const MONGODB_URL = process.env.MONGODB_URL;
const ENV = process.env.ENV
const HOST= process.env.HOST
const PORT= process.env.PORT
const SALT_ROUNDS = process.env.SALT_ROUNDS


module.exports = {
    MONGODB_URL,
    ENV,
    HOST,
    PORT,
    SALT_ROUNDS
}