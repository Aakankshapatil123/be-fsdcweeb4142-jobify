// import express
const cookieParser = require("cookie-parser")
const express = require("express");
const authRouter = require("./routers/authRouters");
const companyRouter = require("./routers/companyRouter");

// create express app
const app = express();

// parse cookies
app.use(cookieParser());

// parse the request body as JSON
app.use(express.json())

// configure routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/companies", companyRouter)

// export the app
module.exports = app;