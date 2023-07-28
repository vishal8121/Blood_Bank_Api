const service = require("../services/bloodBank");
const bcrypt = require('bcrypt');
const getAllUtils = require('../utils/user')
const response = getAllUtils.sendResponse
const db = require('../models/index');
const sequelize = db.sequelize

/***********************************************************************
 
 @Params : req and res
 @Request : req.body
 @Response : request status in json format with status code
 @Description : userRegister function request data from user.
 checkEmail function check email already exist or not.
 if user data not exist(user == null) user created else send response user already registered.  
 addUser function require from service file and called in this function and pass userData (req.body) data as arguments , In response user status return 

 *****************************************************************************/

exports.bloodBankRegister = async (req, res) => {
    await sequelize.sync();
    const bloodBank = await service.checkEmail(req.body.email);
    if (bloodBank == null) {
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const info = {
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            role: "blood_bank",
            phone_number: req.body.phone_number,
            address: req.body.address,
            status: "inactive",
            account_status: "deactivated",
            age: "24",
            gender: "Male",
            created_by: req.body.name
        }
        const bloodBankDetails = {
            name: req.body.name,
            license_no: req.body.license_no,
            address: req.body.address,
            status: "pending",
            created_by: req.body.name
        }
        const data = await service.addBloodBank(bloodBankDetails, info)
        if (data) {
            let mailDetails = {
                from: 'vishalkumarwins@gmail.com',
                to: req.body.email,
                subject: 'Blood Bank Request',
                text: "Your registration has been received and is currently being processed by our team!"
            };
            getAllUtils.sendEmail(mailDetails)
        }
        return response(res, "Your request are under processing. Check your email...", data, "201")
    }
    else {
        return response(res, "Blood Bank not created", null, 200, "Blood Bank already registered")
    }
}



/****************************************************************************

 @Params : req and res
@request: req.body data
@response: status code with mention message.
@Description : This function return response for Blood Bank login. 
login function will be called and email pass as arguments to function. It return response for  user login status.

*****************************************************************************/


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.checkEmail(email)
        if (user == null) {
            return response(res, "User does not exist", null, "403", true);
        }
        else {
            const bloodBank = await service.checkBank(user.dataValues.name)
            // console.log(bloodBank.status)
            if (bloodBank.status == "pending") {
                return response(res, "Your request are under processing...", null, "200");
            }
            else {
                const data = await service.checkEmail(email)
                //  console.log(data)
                if (data) {
                    await service.login(email)
                    if (await bcrypt.compare(password, data.password)) {
                        // Passwords match
                        return response(res, "login successfully", user, "200");
                    } else {
                        // Passwords do not match
                        return response(res, "password incorrect", null, "403", true);
                    }
                }
            }
        }

    } catch (e) {
        console.log("Error" + e);
        return response(res, "Internal Server Error" + e, null, "500", true);
    }
};

exports.pendingRequests = async (req, res) => {
    try {
        const id = req.data
        const data = await service.findId(id);
        if (data.role == "super_user") {
            const requestedBanks = await service.getBloodBankReq();
            // console.log(requestedBanks)
            if (requestedBanks.length == 0) {
                return response(res, "No Data Found", null, "200");
            }
            return response(res, "All Pending Requests", requestedBanks, "200");
        }
        return response(res, "Permission denied", null, "403", true);
    }
    catch (e) {
        console.log("Error" + e);
        return response(res, "Internal Server Error" + e, null, "500", true);
    }
}

exports.processBankRequest = async (req, res) => {
    try {
        const id = req.data
        const data = await service.findId(id);
        if (data.role == "super_user") {
            const data = await service.processRequest(req.body.status, req.body.name)
            if (req.body.status == 'approved') {
                msg = "Your request has been approved"
            }
            msg = "Your request has been rejected"
            if (data > 0) {
                let mailDetails = {
                    from: 'vishalkumarwins@gmail.com',
                    to: req.body.email,
                    subject: 'Blood Bank registration request status',
                    text: msg
                };
                getAllUtils.sendEmail(mailDetails)
                return response(res, "check your email for confirmation", data, "200");
            }
        }
        return response(res, "Permission denied", null, "403");
    }
    catch (e) {
        console.log("Error" + e);
        return response(res, "Internal Server Error" + e, null, "500", true);
    }
}