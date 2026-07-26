const User = require("../models/user")
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../utils/config");

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
        return response.status(200).json({message: "login rout" })
       }catch(e) {
        return response.status(500).json({message: "", error:e.message})
       }
    }, 
     
    // me
    me: async (request, response) => {
       try{
       return response.status(200).json({message: "me rout",})
       }catch(e) {
        return response.status(500).json({message: "", error:e.message})
       }
    },
     
    // logout
    logout: async (request, response) => {
       try{
        return response.status(200).json({message: "logout rout" })
       }catch(e) {
        return response.status(500).json({message: "", error:e.message})
       }
    },
}

module.exports = authController;