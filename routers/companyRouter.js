const express = require("express");
const { createCompany, getCompany, getAllCompany, updateCompany, deleteCompany, createRecruter, getAllRecruter } = require("../controllers/adminController");
const { isAuthenticated, allowRoles } = require("../middlewares/auth");

const companyRouter = express.Router();

// all the following router are admin protected routes
companyRouter.use(isAuthenticated);
companyRouter.use(allowRoles(['admin']));

companyRouter.post("/", createCompany);
companyRouter.get("/", getAllCompany);
companyRouter.get("/:id", getCompany);
companyRouter.put("/:id", updateCompany);
companyRouter.delete("/:id", deleteCompany);
companyRouter.post("/:id/recruters", createRecruter);
companyRouter.get("/:id/recruters", getAllRecruter);

module.exports = companyRouter;