const Company = require("../models/company")

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
     getCompany: async (request, response) => {
        try{
          return response.status(200).json({message: "get company endpoint"})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to get a simple company
    getAllCompany: async (request, response) => {
        try{
          return response.status(200).json({message: "getAllCompany endpoint"})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to update a company
     updateCompany: async (request, response) => {
        try{
          return response.status(200).json({message: "update company endpoint"})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to delete company
     deleteCompany: async (request, response) => {
        try{
          return response.status(200).json({message: "delete company endpoint"})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to create recruter
     createRecruter: async (request, response) => {
        try{
          return response.status(200).json({message: "create recruiter endpoint"})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    },

    // to get all recructor
    getAllRecruter: async (request, response) => {
        try{
          return response.status(200).json({message: "getall recruiter endpoint"})
        }catch(e) {
             return response.status(500).json({message:e.message,})
        }
    }

}

module.exports = adminController;