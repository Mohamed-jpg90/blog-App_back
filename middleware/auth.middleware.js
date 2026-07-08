const { model } = require('mongoose')
const User = require('../models/user.mode')
const jwt = require("jsonwebtoken")


const authentication = async (req, res, next) => {

    try {

        let token = req?.cookies?.access_token?.split(" ")[1]
        let sectetKey = process.env.SECRET_KEY
        let valid = await jwt.verify(token, sectetKey)

        if (!valid) {
            return res.status(401).send({
                message: "un authorized user"
            })
        }
        let user = await User.findById(valid.id)
        if (!user) {
            return res.status(401).send({
                message: "un authorized user "
            })
        }

        delete user.token
        delete user.password
        req.user = user
        next()


    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}


const adminAuthorization = async (req, res, next) => {

    try {
        authentication(req, res, () => {
            if (!req.user.isAdmin) {
                return res.status(403).send({
                    message: "un authorized admin "
                })
            }else {
                next()
            }
        })
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}
module.exports = {
    authentication,
    adminAuthorization
}