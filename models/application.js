const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    Job: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        require: true
    },

    applicant: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    
    status: {
        type:String,
        enum: ['applied', 'reviewing', 'interview', 'rejected', 'accepted'],
        default: 'applied'
    },

    coverLetter: {
        type:String,
    },

    resume: {
        type:String,
    },

    appliedAt: {
        type:Date,
        default:Date.now,
    },

    reviewedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        
    },

    reviewedAt: {
        type:Date,
    },

    notes: {
        type:String
    }

},{timestamps:true});

// compound index to ensure a user can apply only once per job
applicationSchema.index({job:1, applicant:1}, {unique: true});

module.exports = mongoose.model("Application", applicationSchema, 'applications');