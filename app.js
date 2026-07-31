// import express
const cookieParser = require("cookie-parser")
const express = require("express");
const authRouter = require("./routers/authRouters");
const companyRouter = require("./routers/companyRouter");
const jobRouter = require("./routers/jonRouter");
const applicationRouter = require("./routers/applicationRouter");
const path = require("path");
const fs = require('fs')

// create express app
const app = express();

// enable static files for uploads
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// parse cookies
app.use(cookieParser());

// parse the request body as JSON
app.use(express.json())

// configure routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/companies", companyRouter)
app.use("/api/v1/jobs", jobRouter)
app.use("/api/v1/applications", applicationRouter)

// export the app
module.exports = app;