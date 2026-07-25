const authController = {
    // register
    register: async (request, response) => {
       try{
        return response.status(200).json({message: "register rout" })
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