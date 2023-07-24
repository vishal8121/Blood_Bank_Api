const userController = require("../controller/userController")

exports.userRegisterRoute = userController.userRegister;

exports.allUsersRoute = userController.getUsers;

exports.updateUserRoute = userController.updateUser;

exports.deleteUserRoute = userController.deleteUser;

exports.loginUserRoute = userController.loginUser;

// exports.logoutUserRoute = userController.logoutUser;