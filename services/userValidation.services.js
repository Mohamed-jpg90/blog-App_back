// const exports = require('express')
const Joi = require("joi")

let newUserSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .trim()
        .required(),
    lastName: Joi.string()
        .min(3)
        .trim()
        .required(),
    email: Joi.string().
        required()
        .trim()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('')),
    isAdmin:Joi.boolean()
     
})


let userLoginSchema= Joi.object({
    email: Joi.string()
    .email()
    .trim()
    .required(),
    password: Joi.string()
    .trim()
    .required()
})





module.exports = {
     newUserSchema , 
     userLoginSchema 
}