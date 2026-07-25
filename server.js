const mongoose = require("mongoose");
const { MONGODB_URL } = require("./utils/config");

// connected to the mongodb databases
mongoose
.connect(MONGODB_URL)
.then(() => {
    console.log("Connected to the MongoDB")
})
.catch((error) => {
    console.log("Error Connecting to the MongoDB", error.message)
})