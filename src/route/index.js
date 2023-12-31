const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/user");

const userRoute = require('./user')
const superUserRoute = require('./superUser')
const bloodBankRoute = require('./bloodBank')

// user routes

router.post('/register/user', userMiddleware.data, userRoute.userRegisterRoute);

// router.get('/users',userRoute.allUsersRoute);
 
router.put('/updateUser',userMiddleware.verifyToken,userMiddleware.updateData,userRoute.updateUserRoute);

router.delete('/delete',userMiddleware.verifyToken, userRoute.deleteUserRoute);

router.patch('/login',userMiddleware.userLoginAuth, userRoute.loginUserRoute)

router.post('/user/bloodRequest',userMiddleware.verifyToken, userRoute.bloodRequestRoute)

router.post('/user/bloodDonationRequest',userMiddleware.verifyToken, userRoute.bloodDonationRoute)

router.put('/user/bloodRequest/processPayment',userMiddleware.verifyToken, userRoute.makePaymentRoute)
// super user routes

router.post('/register/superUser',userMiddleware.verifyToken, userMiddleware.data, superUserRoute.superUserRegisterRoute);

router.patch('/login',userMiddleware.userLoginAuth, superUserRoute.loginSuperUserRoute) 

router.get('/superuser/pendingRequests',userMiddleware.verifyToken, superUserRoute.bloodBankRequestRoute)

router.patch('/superuser/processRequests',userMiddleware.verifyToken, superUserRoute.bloodBankApprovalRoute)

// blood bank routes
router.post('/register/bloodBank', bloodBankRoute.bloodBankRegisterRoute); 

router.patch('/bloodBank/login',userMiddleware.userLoginAuth, bloodBankRoute.bloodBankLoginRoute);

router.post('/bloodBank/inventory',userMiddleware.verifyToken, bloodBankRoute.bloodBankInventoryRoute)

router.put('/bloodBank/updateInventory',userMiddleware.verifyToken, bloodBankRoute.bloodBankUpdateInventoryRoute)

router.get('/bloodBank/bloodRequest',userMiddleware.verifyToken, bloodBankRoute.checkPendingBloodRequestRoute)

router.patch('/bloodBank/processRequest',userMiddleware.verifyToken, bloodBankRoute.approveBloodRequestRoute)

router.patch('/bloodBank/processRequest/donation',userMiddleware.verifyToken, bloodBankRoute.approveDonationRequestRoute)




module.exports = router

