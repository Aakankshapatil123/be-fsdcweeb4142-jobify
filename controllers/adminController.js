const Company = require("../models/company")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const { SALT_ROUNDS } = require("../utils/config")

const adminController = {
    // create a new company
    createCompany: async (request, response) => {
        try{
          // get the name, description, industry, location, website, size, foundedYear,createdBy from the request body
          const { name, description, indusrty, location, website, size, foundedYear, createdBy} = request.body

          // check if the company already exists with the name provide the request body
          const companyexists = await Company.findOne({name:name})

          // if yes, return 400 status code with message "Company already exists"
          if(companyexists){
             return response.status(400).json({message: "Company already exists"})
          } 

          // create new company object with the Company model and data from the request body
          const newCompany = new Company({
            name, 
            description, 
            indusrty, 
            location, 
            website, 
            size, 
            foundedYear, 
            createdBy: request.user._id
          })

          // save the new company object to the database and store the result in the variable
             const savedCompany = await newCompany.save();

           // delete the __v property from the savedCompany object
           const { __v, ...result } = savedCompany.toObject();
           
          // return a 201 status code with a message  company ctreate successfuly
          return response.status(200).json({message: "Company create successfuly", result})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to get all company
     getAllCompany: async (request, response) => {
        try{
          // get all tge companies from the database and stroe the result in a veriable
          const companies = await Company.find();

          // return a 200 status code with a message "Companies retrieved successfuly" adn the result
          return response.status(200).json({message: "Companies retrieved successfuly", result:companies})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // get all companies
    getCompanyByID: async (request, response) => {
        try{
        //  get the company id from the request params
        const { id } = request.params

        // get the company from the database using the id and store the result in variable
          const  company = await Company.findById(id).populate("createdBy", 'name,email')

        // if company not exist, return a 404 status code with a message "Comapny not found"
          if(!company){
            return response.status(404).json({message: "Company not found"})
          }

        // return a 200 status code with a message "Company retrieved successfuly" and the result
          return response.status(200).json({message: "Companies retrieved successfuly", result:company})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to update a company
     updateCompany: async (request, response) => {
        try{
          // get the company id from the request params
          const { id } = request.params

          // get the company details from the request body
           const { name, description, indusrty, location, website, size, foundedYear, createdBy} = request.body

          // find the company by id and update it with the new details
          const updatedCompany = await Company.findByIdAndUpdate(id,{
            name, 
            description, 
            indusrty, 
            location, 
            website, 
            size, 
            foundedYear, 
          }, {new:true})

          // return a 200 status code with a message "Company updated successfuly" and the updated company details
          return response.status(200).json({message: "update company endpoint",result: updatedCompany})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to delete company
     deleteCompany: async (request, response) => {
        try{
          // get the company id from request params
          const { id } = request.params

          // delete the company from the database using the id and store the result in a variable
          const deleteCompany = await Company.findByIdAndDelete(id)

          // if the company does not exist, return a 404 status code with a message "Company not found"
          if(!deleteCompany){
            return response.status(404).json({message: "Company not found"})
          }

          // return a 200 status code with a message "Company delete Successfuly" and the result
          return response.status(200).json({message: "delete company endpoint", result:deleteCompany})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to create recruter
     createRecruter: async (request, response) => {
        try{
          // get the companyId from the request params
           const { id } = request.params

          // create a new user with the role recruiter and assing to a company
          // get the details(name,email, password, companyId) from the request body
           const { name, email, password } = request.body 

          // check if user exists with email provided in the request body
          const user = await User.findOne({ email: email })

          // if yes, return 400 status code with message "User already exists"
          if(user){
            return response.status(400).json({message: "User already exists"})
          } 

          // check if company exists with companyId provided in the request body
          const company = await Company.findById(id)

          // if no, return 404 status code with message "Company not found"
           if(!company){
            return response.status(404).json({message: "Company not found"})
          }

          // hash password using bcrypt
          const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS))

          // create a new user object with the user model and the data from the request body
          const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role: 'recruiter',
            assignedCompany: company._id
          })
          
          
          // save the new user object to the database and strore the result in a variable
          const savedUser = await newUser.save();

          
      

          // if the user is not created, return a 500 status code with a message "Recruiter creation failed"
          if(!savedUser){
            return response.status(500).json({message: "Recruiter creation failed"})
          }

          // delete the password and __v, property from the savedUser object
          const { password:_, __v, ...result} = savedUser.toObject();

           
          // return a 201 status code with a message "Recruiter create successfuly" and the result
          return response.status(200).json({message: " Recruiter  create successfuly", result})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to get all recructor
    getAllRecruter: async (request, response) => {
        try{
          // get the compant id from the request params
          const { id } = request.params

          // check if the company exits with the companyId provided in the request params
          const company = await Company.findById(id)

          // if no, return 404 status code with a message "Company not found"
          if(!company){
            return response.status(404).json({message: "Company not found"})
          }

          // get all the recruiters from the databse using the companyId and store result in a variable
          const recruiters = await User.find({ assignedCompany: id, role: 'recruiter'}).select('-password -__v');

          console.log(await User.find({ role: "recruiter" }));

          // return a 200 status code with a message "Recruiters retrieved successfuly" and the result
          return response.status(200).json({message: "Recruiters retrievd sucessfuly", result:recruiters})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    }

}

module.exports = adminController;  