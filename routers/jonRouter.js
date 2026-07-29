const express = require("express");
const { getAllJobs, createJob, getJobById, updateJob, deleteJob, getRecruiterJobs, getJobApplications } = require("../controllers/jobController");
const { isAuthenticated, allowRoles } = require("../middlewares/auth");

const jobRouter = express.Router();

// public Routes
jobRouter.get("/", getAllJobs)
jobRouter.get("/:id", getJobById)

// protected Routes
jobRouter.post("/", isAuthenticated, allowRoles(['recruiter']), createJob)
jobRouter.put("/:id",isAuthenticated, allowRoles(['recruiter']), updateJob)
jobRouter.delete("/:id", isAuthenticated, allowRoles(['recruiter']), deleteJob)
jobRouter.get("/recruiter/jobs", isAuthenticated, allowRoles(['recruiter']), getRecruiterJobs)
jobRouter.get("/recruiter/jobs/:id/applications", isAuthenticated, allowRoles(['recruiter']), getJobApplications)


module.exports = jobRouter