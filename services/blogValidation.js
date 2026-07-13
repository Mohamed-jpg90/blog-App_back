const { json } = require('express')
const Joi = require('joi')


const newBlogschima = Joi.object({
    title: Joi.string()
        .required(),
    content : Joi.string()
        .required(),
    image : Joi.string()
    .required
})


module.exports= {
    newBlogschima
}