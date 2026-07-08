const express = require('express')
const route = express.Router()
const blogController = require("../controllers/blog.controler")
const blogUpload = require("../middleware/blog.middleware")
const { required } = require('joi')
const auth = require("../middleware/auth.middleware.js")

route.post("/" ,auth.authentication,blogUpload.single("image"), blogController.createBlog )
route.get('/', auth.authentication, blogController.showBlog  )
module.exports = route