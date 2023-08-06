const bloodBankController = require("../controller/bloodBankController")

exports.bloodBankRegisterRoute = bloodBankController.bloodBankRegister

exports.bloodBankLoginRoute = bloodBankController.login

exports.bloodBankInventoryRoute = bloodBankController.addBloodBankInventory

exports.bloodBankUpdateInventoryRoute = bloodBankController.updateBloodBankInventory

exports.checkPendingBloodRequestRoute = bloodBankController.getPendingBloodRequest

exports.approveBloodRequestRoute = bloodBankController.approveBloodRequest

exports.approveDonationRequestRoute = bloodBankController.collectBlood