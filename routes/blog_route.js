const express = require('express')
const route = express.Router()
const blogController = require("../controllers/blog.controler")
const blogUpload = require("../middleware/blog.middleware")
const { required } = require('joi')
const auth = require("../middleware/auth.middleware.js")

// route.use(auth.authentication)

route.post("/" ,auth.authentication,blogUpload.single("image"), blogController.createBlog )
route.get('/', auth.authentication, blogController.showBlog  )
route.patch('/:id',blogUpload.single("image"),blogController.updateBlog)
route.delete("/:id",auth.authentication,blogController.createBlog)

route.get('/allblogs',auth.adminAuthorization,blogController.getAllBlogs)

module.exports = route