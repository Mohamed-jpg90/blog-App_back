const { newUserSchema , userLoginSchema } =
require('../services/userValidation.services')
function userValidation(req, res, next) {

    try {
        const { error } = newUserSchema.validate(req.body)
        if (error) {
            const errmessage = error.details[0].message
            return res.status(403).send({ message: errmessage })
        }
        next()
 
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}


function loginValidate(req,res,next){
    try {
        const {error} = userLoginSchema.validate(req.body)
        if(error){
            const errmessage = error.details[0].message
            return res.status(403).send({message : errmessage})
        }
        next()
    } catch (error) {
        return res.status(500).send({message : error.message})
    }

}

module.exports = {
    userValidation,
    loginValidate
}