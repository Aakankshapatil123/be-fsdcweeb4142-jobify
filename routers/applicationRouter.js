const express = require("express");
const { isAuthenticated, allowRoles } = require("../middlewares/auth");
const { applyForJob, getUserApplications, updateApplicationsStatus, getApplicationsById } = require("../controllers/applicationController");

const applicationRouter = express.Router();

applicationRouter.use(isAuthenticated);

// user routes
// to apply for a job
applicationRouter.post("/:jobId/apply",allowRoles(['user']), applyForJob);

// get the user applications
applicationRouter.get("/", allowRoles(['user']), getUserApplications);

// recruiter routes
// update the application status
applicationRouter.put("/:applicationId/status",allowRoles(['recruiter']), updateApplicationsStatus);

// shared routes
// get the application by ID
applicationRouter.get("/:applicationId",allowRoles(['user','recruiter']), getApplicationsById);


module.exports = applicationRouter;