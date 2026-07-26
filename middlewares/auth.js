const jwt = require("jsonwebtoken");
const { JWT_SECRATE } = require("../utils/config");
const User = require("../models/user")

// middleware to check if the user is authenticated
const isAuthenticated = async (request, response, next) => {
    //  get token from cookies
    const token = request.cookies &&  request.cookies.token;

    // if there is no token, return a 401, response with message "user is not authenticated"
    if(!token){
        return response.status(401).json({message: "User is not athenticated"})
    }

    try{
        // if there is a token, verify it using jwt.verify()method
         const decoded = await jwt.verify(token, JWT_SECRATE)

        // if the token is valid, get the userid from the token payload
        const userId = decoded.userId;

        // add the user id to the request object from furthur use in the next moddleware or rout handler
         request.userId = userId
        // call the next middleware router
         next();

    }catch(e) {
      return response.status(401).json({message: "Unauthoeized access"})
    }
}

// middleware to check if the user has the required role(s)
const allowRoles = (roles) => {
    return async (request, response, next) => {
    // get user id from request object
    const userId = request.userId;

    // get the user id from the database using the userId
    const user = await User.findById(userId)

    // ckeck if the user exist
    if(!user){
        return response.status(404).json({message: "User not found"})
    } 

    // check if user's is includes in the  allow roles
    // if not, return a 403 response with message "Frobidden:you dont have the required eole(s) to the access this resource"
     if(!roles.includes(user.role)){
        return response.status(403).json({message: "Frobidden:you dont have the required eole(s) to the access this resource"})
     }

    // add the user ibject to the request object for the furthur use in the next middleware or router handleer
      request.user = user

    // if yes, call the next middleware or route handler
     next();
    }
}

// export the middleware function
module.exports = {
    isAuthenticated,
    allowRoles
}