// import express
const express = require("express");
const { register, login, me, logout, uploadProfilePicture, uploadResume,  updateProfile } = require("../controllers/authController");
const { isAuthenticated } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

// setup router
const authRouter = express.Router() 

// configure router
// /public routes
authRouter.post("/register",register);
authRouter.post("/login", login);


// protected routes
authRouter.get("/me", isAuthenticated, me);
authRouter.post("/logout", isAuthenticated, logout);

authRouter.post('/upload/profile-picture', isAuthenticated, upload.single('profilePicture'), uploadProfilePicture); 


authRouter.post('/upload/resume', isAuthenticated, upload.single('resume'), uploadResume);
authRouter.put("/update-profile", isAuthenticated, updateProfile);




// export router
module.exports = authRouter;