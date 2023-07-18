const express = require('express');
const router = express.Router();
const userController = require("../controller/userController")
const userMiddleware = require("../middleware/user");

router.post('/', userMiddleware, userController.userRegister)
module.exports = router