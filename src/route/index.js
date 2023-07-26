const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/user");

const userRoute = require('./user')
const superUserRoute = require('./superUser')

// user routes

router.post('/register/user', userMiddleware.data, userRoute.userRegisterRoute);

router.get('/users',userRoute.allUsersRoute);

router.put('/updateUser',userMiddleware.verifyToken,userMiddleware.updateData,userRoute.updateUserRoute);

router.delete('/delete',userMiddleware.verifyToken, userRoute.deleteUserRoute);

router.patch('/login',userMiddleware.userLoginAuth, userRoute.loginUserRoute)

router.post('/user/bloodRequest',userMiddleware.verifyToken, userRoute.bloodRequestRoute)
// super user routes

router.post('/register/superUser',userMiddleware.verifyToken, userMiddleware.data, superUserRoute.superUserRegisterRoute);

router.patch('/login',userMiddleware.userLoginAuth, superUserRoute.loginSuperUserRoute) 

router.get('/superuser/pendingRequests',userMiddleware.verifyToken, superUserRoute.bloodBankRequestRoute)

router.patch('/superuser/acceptRequests',userMiddleware.verifyToken, superUserRoute.bloodBankApprovalRoute)

// blood bank (admin) routes
router.post('/register/bloodBank', userMiddleware.data, userRoute.userRegisterRoute);







module.exports = router

