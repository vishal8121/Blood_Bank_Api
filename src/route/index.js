const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/user");

const userRoute = require('./user')



router.post('/', userMiddleware.data, userRoute.userRegisterRoute)

router.get('/users',userRoute.allUsersRoute)

router.put('/updateUser/:id',userMiddleware.updateData,userRoute.updateUserRoute)

module.exports = router
