const Application = require("../models/application")
const company = require("../models/company")
const Job = require("../models/job")

const applicationController = {
    applyForJob: async (request, response) => {
       try{
        // get the jobId from the params
        const { jobId } = request.params

        // get the userId from the request.userId
        const userId = request.userId

        // grt thr covverLetter from the request.body
        const { coverLetter } = request.body

        // get the job from database using the jobId
        // check if job exists and is active
        const job = await Job.findOne({_id: jobId, isActive: true})

        // if no return 404
        if(!job) {
            return response.status(404).json({message: "Job not found or is not active"})
        }

        // check if user has already applied for job
        const exisingApplication = await Application.findOne({ job: jobId, applicant: userId})

        // if yes, return 400
        if(exisingApplication) {
            return response.status(404).json({message: "You have already applied for the job"})
        }

        // check if application deadline has passed
        // if yes, return 400
        if(job.applicationDeadline && new Date() > job.applicationDeadline){
            return response.status(404).json({message: "The application deadline for this job has passed"})
        }

        // create the application
        const newApplication = new Application({
            job: jobId,
            applicant: userId,
            coverLetter: coverLetter || '',
        })

        // save the application to the database
        await newApplication.save();

        // update the job's applications count
        await Job.findByIdAndUpdate(jobId, { $inc: { applicationCount: 1}})  

        // send an email notification to the employer about the new application

        // return success response
        return response.status(201).json({message: "Application submitted successfuly", application: newApplication});
       
       }catch(e) {
       return response.status(500).json({message: "Failed to apply for job", error:e.message});
        }
    },

    getUserApplications: async (request, response) => {
       try{
        const userId = request.userId

        const applications = await Application.find({ applicant: userId}).populate({
                path:'job',
                populate:'company',
                select: 'title description location jobType experienceLevel company',
                populate: {
                    path:'company',
                    select: 'name logo'
                }
            }) 
            .sort({ createdAt: -1});
        
        response.status(200).json({applications})
       
        }catch(e) {
        return response.status(500).json({message: "Failed to apply for job", error:e.message});
        }
    },

    updateApplicationsStatus: async (request, response) => {
       try{
        const { applicationId } = request.params;
         
        const { notes, status } = request.body

        const userId = request.userId;

        // find the application by ID
        const application = await Application.findById(applicationId).populate({
                path:'job',
                populate:{
                    path: 'postedBy'
                }
            })
            .populate('applicant', 'name email')

        
        
        if(!application) {
            return response.status(404).json({message: "Application not found"});
        }

        // check if the logged in user is the employer who posted the job
        if(application.job.postedBy._id.toString() !== userId) {
            return response.status(403).json({message: "You are not authorized to update this application"});
        }

        // update the application status and notes
        application.status = status || application.status;
        application.notes = notes || application.notes;
        application.reviewedBy = userId
        application.reviewedAt = new Date();

        await application.save();

        // send an email notification to the applicant about the status update
        
        // return success response
         return response.status(200).json({message: "Application status successfuly", applications: application});
        

        }catch(e) {
        return response.status(500).json({message: "Failed to apply for job", error:e.message});
        }
    },

    getApplicationsById: async (request, response) => {
       try{
        const { applicationId } = request.params;
         

        const userId = request.userId;

        // find the application by ID
        const application = await Application.findById(applicationId).populate({
                path:'job',
                populate:{
                    path: 'company',
                    select: 'name logo'
                }
            })
            .populate('reviewedBy', 'name')
        
        if(!application) {
            return response.status(404).json({message: "Application not found"});
        }

        // check if the logged in user is  either  applicant or the employer who posted the job
        if(application.applicant.toString() !==userId && application.job.postedBy.toString() !==userId) {
            return response.status(403).json({message: "You are not authorized to view this application"});
        }

        // send an email notification to the applicant about the status update
        
        // return success response
         return response.status(200).json({application});
       
        }catch(e) {
        return response.status(500).json({message: "Failed to apply for job", error:e.message});
        }
    }
}

module.exports = applicationController;