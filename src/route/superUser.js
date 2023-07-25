const userController = require("../controller/userController")

exports.superUserRegisterRoute = userController.userRegister;

exports.loginSuperUserRoute = userController.loginUser;

exports.bloodBankRequestRoute = userController.pendingRequests;  

exports.bloodBankApprovalRoute = userController.acceptBankRequest