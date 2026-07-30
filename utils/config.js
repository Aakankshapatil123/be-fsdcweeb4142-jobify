require("dotenv").config()

const MONGODB_URL = process.env.MONGODB_URL;
const ENV = process.env.ENV
const HOST= process.env.HOST
const PORT= process.env.PORT
const SALT_ROUNDS = process.env.SALT_ROUNDS
const JWT_SECRATE = process.env.JWT_SECRATE
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS


module.exports = {
    MONGODB_URL,
    ENV,
    HOST,
    PORT,
    SALT_ROUNDS,
    JWT_SECRATE,
    SMTP_USER,
    SMTP_PASS
}