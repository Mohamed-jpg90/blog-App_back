const express = require("express")
const router = express.Router()

const userCtl = require("../controllers/user.control")
const auth = require("../middleware/auth.middleware");

router.route('/:id')
      .delete(auth.adminAuthorization, userCtl.deleteUser)

module.exports = router