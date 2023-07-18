const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/user");

const userRoute = require('./user')



router.post('/', userMiddleware, userRoute.userRegisterRoute)

router.get('/users',userRoute.allUsersRoute)

module.exports = router
