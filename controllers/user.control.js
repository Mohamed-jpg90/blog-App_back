const User = require('../models/user.mode')
// const  logger

const userControler = {
    deleteUser: async(req,res)=>{
        try {
              let {id} = req.params
              await User.findByIdAndDelete(id)

              res.send({
                message:"Accout is delted "
              })
            
        } catch (error) {
            res.status(500).send({
                message:error.message
            })
        }
    }
}


module.exports = userControler