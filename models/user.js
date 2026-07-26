// import mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'recructer'],
        default: 'user'
    },

    profilePeture: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
    },

    resume: {
        type: String,
    },

    bio: {
        type: String,
    },

    skils: [
        {
            type:String
        }
    ],

    experience: {
        type: Number,
        default: 0
    },
    
    location: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema, "users")