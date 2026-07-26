const User = require("../models/user")
const bcrypt = require("bcrypt");
const { SALT_ROUNDS, JWT_SECRATE, ENV } = require("../utils/config");
const jwt = require("jsonwebtoken")

const authController = {
    // register
    register: async (request, response) => {
       try{
           // get name, email, password from request body
           const { name, email, password } = request.body
          
           //   check if user with the same already exist in the databse
            const existingUser =  await User.findOne({email});

           //   ifyes, retun a 400 response with message "User already exists"
            if(existingUser){
               return response.status(500).json({message: "User already exists"})
            }

           // hash password using bcrypt
           const hashPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
           
          //   create new user object using user model
          const newUser = new User({
            name,
            email,
            password:hashPassword
          })
 
           // save the user object to the database
           await newUser.save();

           // return a success responce
           return response.status(200).json({message: "User register successfuly" })
         }catch(e) {
        return response.status(500).json({message: "", error:e.message})
      }
    },
    
    // login
    login: async (request, response) => {
       try{
         // get email and password from the request body
         const { email, password } = request.body;

         // check if user with the email exists in the databse
         const user = await User.findOne({email})

         // if not, return 400 response with message "Invalid email user does not exist"
         if(!user){
            return response.status(400).json({message: "Invalid email user does not exist"})
         }

         // if yes, compare the password with the hashed pssword in the datsbase using bcrypt
        const passswordMatch = await bcrypt.compare(password, user.password)

         // if not match, return a 400 response with meessage "invalid passsword"
         if(!passswordMatch){
            return response.status(400).json({message: "Invalid Password"})
         }

         // genrate a jwt token for the user
         const token = await jwt.sign({ userId: user._id}, JWT_SECRATE, {expiresIn: "1h"}) 

         // set the cookie with the token
         response.cookie('token', token, {
             httpOnly:true,
             secure: ENV === 'production', //set secure flag only in production
             sameSite: ENV === "production" ? "none": 'lax', // set sameSite flag based enviroment
             maxAge: 3600000 //set cookie expiration time in 1 hour

         })
         
         // return a success response with the token
        return response.status(200).json({message: "User login successfuly" })
       }catch(e) {
        return response.status(500).json({message: "", error:e.message})
       }
    }, 
     
    // me
    me: async (request, response) => {
       try{
         // get user id from the requestr object
         const userId = request.userId

         // find the user in the database using user id (make sure to exclude the password field from the response)
          const user = await User.findById(userId).select('-password -__v');

         // send the user object as a response
       return response.status(200).json(user);
       }catch(e) {
        return response.status(500).json({message: "", error:e.message})
       }
    },
     
    // logout
    logout: async (request, response) => {
       try{
         // clear the cookie with the token
            response.clearCookie('token', {
            httpOnly:true,
            secure: ENV === 'production', //set secure flag only in production
            sameSite: ENV === "production" ? "none": 'lax', // set sameSite flag based enviroment

         })
        return response.status(200).json({message: "User logout Successfuly" })
       }catch(e) {
        return response.status(500).json({message: "", error:e.message})
       }
    },
}

module.exports = authController;