const express = require ("express")
const router = express.Router()
const authController = require("../controllers/auth.control")
const {userValidation, loginValidate} = require('../middleware/uservalidation.middleware')
const auth = require('../middleware/auth.middleware')


router.post('/login',loginValidate,authController.loginUser)
router.post("/signup",userValidation,authController.newUser)
router.post("/logout",auth.authentication,authController.logout)

module.exports = router