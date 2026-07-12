const express = require("express")
const router = express.Router()
const blogUpload = require("../middleware/blog.middleware")

const userCtl = require("../controllers/user.control")
const auth = require("../middleware/auth.middleware");

router.route('/:id')
      .delete(auth.adminAuthorization, userCtl.deleteUser)
      
router.patch(
    "/updateuser",
    auth.authentication,
    blogUpload.single("image"),
    userCtl.updateUser
);
router.patch('/updatePassword' , auth.authentication, userCtl.updatePassword )
router.get("/profile" ,auth.authentication , userCtl.getUser  )
module.exports = router