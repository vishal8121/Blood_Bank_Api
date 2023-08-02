const service = require("../services/bloodBank");
const bcrypt = require('bcrypt');
const getAllUtils = require('../utils/user')
const response = getAllUtils.sendResponse
const db = require('../models/index');
const { exist } = require("joi");
const sequelize = db.sequelize
const MESSAGE = require('../utils/enums');


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
        console.log(bloodBank);
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const info = {
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            role: "blood_bank",
            phone_number: req.body.phone_number,
            address: req.body.address,
            status: "inactive",
            age: "24",
            gender: "Male",
            created_by: req.body.name
        }
        await service.addBloodBankAdmin(info);
        const getAdmin = await service.checkEmail(req.body.email);
        const bloodBankDetails = {
            name: req.body.name,
            license_no: req.body.license_no,
            address: req.body.address,
            status: "pending",
            created_by: req.body.name,
            UserId: getAdmin.dataValues.id
        }
        const data = await service.addBloodBankDetails(bloodBankDetails)
        // console.log(bloodBank)
        if (data) {
            let mailDetails = {
                from: 'vishalkumarwins@gmail.com',
                to: req.body.email,
                subject: 'Blood Bank Request',
                text: "Your registration has been received and is currently being processed by our team!"
            };
            getAllUtils.sendEmail(mailDetails)
        }
        return response(res,MESSAGE.under_process.value, data, "201")
    }
    else {
        return response(res,MESSAGE.not_created.value, null, 200, "Blood Bank already registered")
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
            return response(res,MESSAGE.not_registered.value, null, "403", true);
        }
        else {
            const bloodBank = await service.checkBank(user.dataValues.name)
            // console.log(bloodBank.status)
            if (bloodBank.status == "pending") {
                return response(res,MESSAGE.under_process.value, null, "200");
            }
            else {
                const data = await service.checkEmail(email)
                //  console.log(data)
                if (data) {
                    await service.login(email)
                    if (await bcrypt.compare(password, data.password)) {
                        // Passwords match
                        return response(res,MESSAGE.login_success.value, user, "200");
                    } else {
                        // Passwords do not match
                        return response(res,MESSAGE.password_incorrect.value, null, "403", true);
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
        return response(res,MESSAGE.permission_denied.value, null, "403");
    }
    catch (e) {
        console.log("Error" + e);
        return response(res, "Internal Server Error" + e, null, "500", true);
    }
}

exports.addBloodBankInventory = async(req, res)=>{
    if(req.data){
        const data = await service.findId(req.data);
        const bloodBank = await service.checkBank(data.name)
        const existInventory = await service.checkExistBankInventory(bloodBank.id)
        const bloodUnits = {
            a_positive: req.body.a_positive,
            a_negative: req.body.a_negative,
            b_positive: req.body.b_positive,
            b_negative: req.body.b_negative,
            ab_positive: req.body.ab_positive,
            ab_negative: req.body.ab_negative,
            o_positive: req.body.o_positive,
            o_negative: req.body.o_negative,
            BloodBankId: bloodBank.id,
            created_by: data.name
          }
          const price = {
            a_positive:req.body.a_positive_price,
            a_negative:req.body.a_negative_price,
            b_positive:req.body.b_positive_price,
            b_negative:req.body.b_negative_price,
            ab_positive:req.body.ab_positive_price,
            ab_negative:req.body.ab_negative_price,
            o_positive:req.body.o_positive_price,
            o_negative:req.body.o_negative_price,
            BloodBankId: bloodBank.id,
            created_by: data.name
          }
        if(existInventory == null){
              const bloodUnit = await service.addBloodUnits(bloodUnits); 
              const unitPrice = await service.addBloodUnitPrice(price);
              if(bloodUnit){
                return response(res,MESSAGE.add_data_success.value, {Data:{bloodUnit:bloodUnit, bloodPrice: unitPrice}}, "201");
              }
              else{
                return response(res,MESSAGE.enter_data.value, null, "200",true);
              }
        }
        return response(res,MESSAGE.all_data.value, existInventory, "200",true);
    }else{
        return response(res,MESSAGE.permission_denied.value + e, null, "500", true);
    }
}


exports.updateBloodBankInventory = async(req,res)=>{
    if(req.data){
        const data = await service.findId(req.data);
        const bloodBank = await service.checkBank(data.name)
        const existInventory = await service.checkExistBankInventory(bloodBank.id)
        if(existInventory){
        const bloodUnits = {
            a_positive_units: req.body.a_positive,
            a_negative_units: req.body.a_negative,
            b_positive_units: req.body.b_positive,
            b_negative_units: req.body.b_negative,
            ab_positive_units: req.body.ab_positive,
            ab_negative_units: req.body.ab_negative,
            o_positive_units: req.body.o_positive,
            o_negative_units: req.body.o_negative,
            BloodBankId: bloodBank.id,
            updated_by: data.name
          }
          const price = {
            a_positive:req.body.a_positive_price,
            a_negative:req.body.a_negative_price,
            b_positive:req.body.b_positive_price,
            b_negative:req.body.b_negative_price,
            ab_positive:req.body.ab_positive_price,
            ab_negative:req.body.ab_negative_price,
            o_positive:req.body.o_positive_price,
            o_negative:req.body.o_negative_price,
            BloodBankId: bloodBank.id,
            updated_by: data.name
          }
        const bloodUnit = await service.updateInventory(bloodBank.id,bloodUnits); 
        const unitPrice = await service.updatePrice(bloodBank.id,price);
        if(bloodUnit){
            return response(res,MESSAGE.update_success.value, {
             units:bloodUnits,
             price: price    
            }, "200");
        }
        }
        return response(res,MESSAGE.data_not_found.value, null, "200",true);
    }
}

