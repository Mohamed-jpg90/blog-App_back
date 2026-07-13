const express = require('express')
const route = express.Router()
const blogController = require("../controllers/blog.controler")
const blogUpload = require("../middleware/blog.middleware")
const auth = require("../middleware/auth.middleware.js")


route.post("/" ,auth.authentication,blogUpload.single("image"), blogController.createBlog )
route.get('/', auth.authentication, blogController.showBlog  )
route.patch('/:id',blogUpload.single("image"),auth.authentication,blogController.updateBlog)
route.delete("/:id",auth.authentication,blogController.deleteBlog)

route.get('/allblogs',auth.adminAuthorization,blogController.getAllBlogs)

module.exports = route