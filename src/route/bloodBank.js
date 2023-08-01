const bloodBankController = require("../controller/bloodBankController")

exports.bloodBankRegisterRoute = bloodBankController.bloodBankRegister

exports.bloodBankLoginRoute = bloodBankController.login

exports.bloodBankInventoryRoute = bloodBankController.addBloodBankInventory