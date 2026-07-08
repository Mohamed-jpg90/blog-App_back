const express = require('express')
const route = express.Router()
const authRouter =  require('./auth_route')
const user = require('./user_route')
const blogRoute = require('./blog_route')

route.use("/auth",authRouter)
route.use('/user',user)
route.use('/blog',blogRoute)

module.exports =  route