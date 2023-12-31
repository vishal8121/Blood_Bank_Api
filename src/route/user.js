const userController = require("../controller/userController")

exports.userRegisterRoute = userController.userRegister;

exports.allUsersRoute = userController.getUsers;

exports.updateUserRoute = userController.updateUser;

exports.deleteUserRoute = userController.deleteUser;

exports.loginUserRoute = userController.loginUser;

exports.bloodRequestRoute = userController.bloodRequest;

exports.bloodDonationRoute = userController.bloodDonationRequest;

exports.makePaymentRoute = userController.makePayment


// exports.logoutUserRoute = userController.logoutUser;