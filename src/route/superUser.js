const userController = require("../controller/userController")
const bloodBankController = require("../controller/bloodBankController")
exports.superUserRegisterRoute = userController.userRegister;

exports.loginSuperUserRoute = userController.loginUser;

exports.bloodBankRequestRoute = bloodBankController.pendingRequests;  

exports.bloodBankApprovalRoute = bloodBankController.processBankRequest