const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/user");

const userRoute = require('./user')



router.post('/', userMiddleware.data, userRoute.userRegisterRoute);

router.get('/users',userRoute.allUsersRoute);

router.put('/updateUser/:id',userMiddleware.verifyToken,userMiddleware.updateData,userRoute.updateUserRoute);

router.delete('/delete/:id',userMiddleware.verifyToken, userRoute.deleteUserRoute);

router.patch('/login',userMiddleware.userLoginAuth, userRoute.loginUserRoute)


module.exports = router

