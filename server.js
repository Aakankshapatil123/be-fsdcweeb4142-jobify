const mongoose = require("mongoose");
const { MONGODB_URL, PORT, HOST } = require("./utils/config");
const app = require("./app");
const { error } = require("node:console");


// connected to the mongodb databases
mongoose
.connect(MONGODB_URL)
.then(() => {
    console.log("Connected to the MongoDB")

    // START THE SERVER AFTER SUCCESSFUL DATABASE CONNECTION
    app
    .listen(PORT, HOST, () => {
        console.log(`server running on http://${HOST}:${PORT}`)
    })
    .on(error,(error) => {
       console.log("Error satrting the server:", error.message)
    })
})
.catch((error) => {
    console.log("Error Connecting to the MongoDB", error.message)
})