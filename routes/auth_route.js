const express = require ("express")
const router = express.Router()
const authController = require("../controllers/auth.control")
const {userValidation, loginValidate} = require('../middleware/uservalidation.middleware')


router.post('/login',loginValidate,authController.loginUser)
router.post("/singup",userValidation,authController.newUser)

module.exports = router