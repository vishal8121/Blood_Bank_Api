const service = require("../services/user");
const BloodBank = require("../services/bloodBank");
const bcrypt = require('bcrypt');
const getAllUtils = require('../utils/user')
const MESSAGE = require('../utils/enums');
const STATUS_CODE = require('../utils/statusCode');
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

exports.userRegister = async (req, res) => {
    try{
        await sequelize.sync();
        const user = await service.checkEmail(req.body.email);
        if (user == null) {
            if(req.body.role == 'super_user'){ 
                const tokenId = req.data; 
                const dataId = await service.findId(tokenId);
                if(dataId.role == 'super_user'){
                    encryptedPassword = await bcrypt.hash(req.body.password, 10);
                    const userData = {
                        name: req.body.name,
                        email: req.body.email,
                        age: req.body.age,
                        gender: req.body.gender,
                        password: encryptedPassword,
                        role: req.body.role,
                        phone_number: req.body.phone_number,
                        address: req.body.address,
                        account_status: "activated",
                        status: "inactive",
                        created_by: dataId.name
                    }
                    const data = await service.addUser(userData);
                    return response(res,MESSAGE.registered.value,data,STATUS_CODE.CREATED.value)
                }
                return response(res,MESSAGE.permission_denied.value,null,STATUS_CODE.FORBIDDEN.value,true);
            }
                encryptedPassword = await bcrypt.hash(req.body.password, 10);
                const userData = {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                gender: req.body.gender,
                blood_group: req.body.blood_group,
                password: encryptedPassword,
                role: req.body.role,
                phone_number: req.body.phone_number,
                address: req.body.address,
                last_donation_date: req.body.last_donation_date,
                status: "inactive",
                created_by: req.body.name
            }
            const data = await service.addUser(userData);
            return response(res,MESSAGE.registered.value,data,STATUS_CODE.CREATED.value)
            }     
        
        else {
            return response(res,MESSAGE.not_registered.value,null,STATUS_CODE.SUCCESS.value,"User email already registered")
        }
    }
    catch(e){
        return response(res, "Internal Server Error" + e, null,STATUS_CODE.Internal_Server_Error.value, true);
    }
}


/*******************************************************************************
@Params : req and res
@Response : user data and status

******************************************************************************/

exports.getUsers = (async (req, res) => {
    try{
        const users = await service.getUser()
        if (users.length == 0) {
            return response(res,MESSAGE.data_not_found.value,data,null,STATUS_CODE.SUCCESS.value);
        }
        return response(res,MESSAGE.all_data.value,data,users,STATUS_CODE.SUCCESS.value);
    }
    catch(e){
        return response(res, "Internal Server Error" + e, null,STATUS_CODE.Internal_Server_Error.value, true);
    }
   
});


/**********************************************************************
 
@request: id and req.body(user data)
@response: status code with mention message.
@Params : req and res
@Description : This function return response for updated user. updateUser function will be called and req.params.id or req.body pass as arguments to function.

************************************************************************/

exports.updateUser = async (req, res) => {
    try{
        const tokenId = req.data; 
        console.log(tokenId)
        // const id = req.params.id;
        const dataId = await service.findId(tokenId);
        const data = req.body;
        data.updated_by = dataId.name;
        await service.updateUser(dataId.id, data);
        return response(res,MESSAGE.update_success.value,data,STATUS_CODE.SUCCESS.value);
    }
    catch(e){
        return response(res, "Internal Server Error" + e, null, STATUS_CODE.Internal_Server_Error.value, true);
    }
   
}


/*****************************************************************************
 
 @Params : req and res
@request: id 
@response: status code with mention message.
@Description : This function return response for Deleted user. deleteUser function will be called and req.params.id pass as arguments to function. It return response for deleted user.

*****************************************************************************/

exports.deleteUser = async (req, res) => {
    try{
        id = req.data;
        await service.deleteUser(id);
        return response(res,MESSAGE.account_deleted.value,null,STATUS_CODE.SUCCESS.value);
    }
    catch(e){
        return response(res, "Internal Server Error" + e, null,STATUS_CODE.Internal_Server_Error.value, true);
    }
}


/****************************************************************************

 @Params : req and res
@request: req.body data
@response: status code with mention message.
@Description : This function return response for login  user. loginUSer function will be called and email pass as arguments to function. It return response for  user login status.

*****************************************************************************/


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await service.loginUser(email);
        // console.log(user.dataValues.status = "active")
        if (user != null) { 
            if (await bcrypt.compare(password, user.password)) {
                // Passwords match
                return response(res,MESSAGE.login_success.value,user,STATUS_CODE.SUCCESS.value);
            } else {
                // Passwords do not match
               return response(res,MESSAGE.password_incorrect.value,null,STATUS_CODE.FORBIDDEN.value,true);
            }
        }
        // User not found
        return response(res,MESSAGE.not_registered.value,null,STATUS_CODE.FORBIDDEN.value,true);
    } catch (e) {
        console.log("Error" + e);
        return response(res,"Internal Server Error"+e,null,STATUS_CODE.Internal_Server_Error.value,true);
    }
};

 

 exports.bloodRequest = async(req, res)=>{
    try{
        await sequelize.sync();
        const tokenId = req.data
        const bloodBank = await service.findName(req.body.bloodBank)
        if(bloodBank){
            const user = await service.findId(tokenId);
            const reqData = {
                type: 'request',
                units: req.body.units,
                blood_group: req.body.blood_group,
                status: "pending",
                created_by: user.name,
                UserId : user.id,
                BloodBankId: bloodBank.id
            }
            if(user.status == 'active' && user.role == 'user'){
                    const checkBloodGroup = await BloodBank.findBloodGroup(req.body.blood_group)
                    if(checkBloodGroup[req.body.blood_group]>0){
                    const data =  await service.bloodRequest(reqData)
                    if(data){
                        const paymentData ={
                            status: "pending",
                            BloodRequestId: data.id,
                            created_by: bloodBank.name
                        }
                        const createPayment = await BloodBank.createPayment(paymentData)
                      return response(res,MESSAGE.under_process.value,reqData,STATUS_CODE.CREATED.value)
                    }
                    }
                    return response(res,MESSAGE.blood_not_available.value,null,STATUS_CODE.SUCCESS.value,true)
                }
                else{
                    return response(res,MESSAGE.permission_denied.value,null,STATUS_CODE.FORBIDDEN.value,true)
                } 
            }
        else{
            return response(res,MESSAGE.not_exist.value,null,STATUS_CODE.FORBIDDEN.value,true)
        }  
    }
    catch(e){
        return response(res,"Internal Server Error"+e,null,STATUS_CODE.Internal_Server_Error.value,true);
    }
    
 }

 exports.bloodDonationRequest = async(req, res)=>{
    try{
        await sequelize.sync();
        const tokenId = req.data
        const bloodBank = await service.findName(req.body.bloodBank)
        if(bloodBank){
            const user = await service.findId(tokenId);
            const reqData = {
                type: 'donation',
                units: "1",
                blood_group: user.blood_group,
                status: "pending",
                created_by: user.name,
                UserId : user.id,
                BloodBankId: bloodBank.id
            }
            if(user.status == 'active' && user.role == 'user'){
                    const checkBloodGroup = await BloodBank.findBloodGroup(user.blood_group)
                    if(checkBloodGroup[user.blood_group]>0){
                    const data =  await service.bloodRequest(reqData)
                    if(data){
                      return response(res,MESSAGE.under_process.value,reqData,STATUS_CODE.CREATED.value)
                    }
                    }
                    return response(res,MESSAGE.blood_not_available.value,null,STATUS_CODE.SUCCESS.value,true)
                }
                else{
                    return response(res,MESSAGE.permission_denied.value,null,STATUS_CODE.Unauthorized.value,true)
                } 
            }
        else{
            return response(res,MESSAGE.not_exist.value,null,STATUS_CODE.FORBIDDEN.value,true)
        }  
    }
    catch(e){
        return response(res,"Internal Server Error"+e,null,STATUS_CODE.Internal_Server_Error.value,true);
    }
   
 }


 exports.makePayment = async(req,res) =>{
   try{
    const user = await service.findId(req.data);
    const bloodReq = await BloodBank.findBloodRequest(req.body.requestId)
    if(user.status == 'active' && user.role == 'user'){
        if(bloodReq.type == 'request' && bloodReq.status == 'Approved'){
        const pay = await BloodBank.findPaymentStatus(req.body.requestId)
        if(pay.status == "failed"){
            return response(res,MESSAGE.payment_try.value,null,"403",true)  
        }
        const price = await BloodBank.findBloodPrice(bloodReq.BloodBankId)
        const info={
            "transaction_id": "TX4567891234567", 
            "payment_method": req.body.payment_method,
            "status": "failed",
         }
        if(price[bloodReq.blood_group]*bloodReq.units == req.body.price){
          info.status = "Completed"
          const paymentComplete =  await BloodBank.makePayment(bloodReq.id, info)
          if(paymentComplete){
            return response(res,MESSAGE.payment_success.value,info,"200") 
          }
          info.status = "failed"
          return response(res,MESSAGE.payment_failed.value,info,"200",true) 
        }
        else if(price[bloodReq.blood_group]*bloodReq.units < req.body.price){
         info.status = "pending"
         await BloodBank.makePayment(bloodReq.id, info)
         return response(res,MESSAGE.valid_pay.value,info,"200",true) 
        }
          const reject = {
            "status":"Rejected"
          }
          const fail = await BloodBank.rejectRequestStatus(bloodReq.id,reject)
          console.log(fail+"VISH")
          const inventory = await BloodBank.findBloodInventory(bloodReq.BloodBankId)
          const increment = inventory[bloodReq.blood_group] + bloodReq.units
          const data = {}
          data[bloodReq.blood_group] = increment
          await BloodBank.bloodRequestIncrement(bloodReq.BloodBankId,data)
        //   console.log(bloodReq.units+"7686")
   await BloodBank.makePayment(bloodReq.id, info)
   return response(res,MESSAGE.insufficient_balance.value,info,STATUS_CODE.SUCCESS.value) 
        }
        else if(bloodReq.status == "Rejected"){
   return response(res,MESSAGE.rejected.value,null,STATUS_CODE.FORBIDDEN.value)
        }
   return response(res,MESSAGE.under_process.value,null,STATUS_CODE.SUCCESS.value)
   }
   return response(res,MESSAGE.permission_denied.value,null,STATUS_CODE.Unauthorized.value,true)
}
   catch(e){
    return response(res,"Internal Server Error"+e,null,STATUS_CODE.Internal_Server_Error.value,true);
   }
 }

// exports.logoutUser = async(req, res) =>{
//     try{
//           tokenId = req.data
//           const user = await service.logout(tokenId);
//           return response(res,"Logout successfully",user.name,"200");
//     }
//     catch(e){
//         console.log("Error" + e);
//     }
// }





