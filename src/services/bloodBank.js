const db = require('../models')
const bloodBankAdmin = db.user;
const bloodBank = db.bloodBank;
const bloodInventory = db.bloodInventory;
const bloodPrice = db.bloodPrice;
const bloodRequest = db.bloodRequest;
const pay = db.payments;

/****************************************************************************** 
@params : Data
@Description : created addBloodBank function for create bloodbank and save blood bank data into database. if blood bank data save into database this function return blood bank data, if return error throw error

*******************************************************************************/
exports.addBloodBankDetails = async(data)=>{
  try{
    const bloodB = await bloodBank.create(data)
    return bloodB
  }
  catch(e){
    throw e;
  }
}

/*
@params : Data
@Description : created addBloodBankAdmin function for create blood bank admin into database.
*/

exports.addBloodBankAdmin = async(data)=>{
  try{
    const admin = await bloodBankAdmin.create(data)
    return admin
  }
  catch(e){
    console.log(e);
  }
}

/*
@params : email
@Description : created checkEmail function for find admin matches email in database.
*/

exports.checkEmail = async (email) => {
  try {
      const user = await bloodBankAdmin.findOne({
          where: {
              email: email
          }
      });
      // console.log(user)
      return user;
  } catch (e) {
      throw Error('Error:'+e)
  }
};


/*
@params : blood bank name
@Description : created checkBank function for find blood bank with matching name in database.
*/

exports.checkBank = async (name) => {
  try {
      const user = await bloodBank.findOne({
          where: {
              name: name
          }
      })
      return user;
  } catch (e) {
      throw Error('Error:'+e)
  }
};


/*
@params : id
@Description : created checkBankById function for find blood bank with matching id in database.
*/

exports.checkBankById = async (id) => {
  try {
      const user = await bloodBank.findOne({
          where: {
              id: id
          }
      })
      return user;
  } catch (e) {
      throw Error('Error:'+e)
  }
};


/*
@params : email
@Description : created login function for update user status to active status and match email with login email in database.
*/

exports.login = async(email)=>{
  try{
    
       const user = await bloodBankAdmin.update(
        {status : "active"},
        {where : {email : email}
      });
       return user; 
 }
  catch(e){
   console.log("error"+e);
  }

}

/*
@params : id
@Description : created findId function find user by id with matching id.
*/

exports.findId = async (id) => {
  try {
      const user = await bloodBankAdmin.findOne({ 
          where: {
              id: id
          }
      })
      // console.log(user)
      return user;
  } catch (e) {
      throw e ;
  }
};


/*
@Description : created getBloodBankReq function for get all pending request to blood bank.
*/

exports.getBloodBankReq = async()=>{
  try{
    const requestedBanks = await bloodBank.findAll({
      where: {
        status: "pending"
      }
    })
    // console.log(requestedBanks)
    return requestedBanks;
    }
  catch(e){
    console.log(e);
  }
}


/*
@params : reqStatus, name
@Description : created processRequest function for update status of blood bank with matching their name.
*/

exports.processRequest = async(reqStatus,name) =>{
  try{
     const request = await bloodBank.update({
      status : reqStatus
     },
     {
      where : {
       name : name
      }
     }
     )
     return request
  }
  catch(e){
    throw Error('Error :'+e);
  }
}

/*
@params : units
@Description : created addBloodUnits function for add units in blood inventory.
*/

exports.addBloodUnits = async(units)=>{
  try{
    const addUnits = await bloodInventory.create(units);
    return addUnits;
  }
  catch(err){
    throw err;
  }
}

/*
@params : unitPrice
@Description : created addBloodUnitPrice function for add unitsPrice in blood Price table.
*/

exports.addBloodUnitPrice = async(unitPrice)=>{
  try{
    const bloodUnit = await bloodPrice.create(unitPrice);
    return bloodUnit;
  }
  catch(err){
    throw err;
  }
}


/*
@params : id
@Description : created checkExistBankInventory function for check any existing blood bank.
*/

exports.checkExistBankInventory = async(id)=>{
  try{
    const existInventory = await bloodInventory.findOne({ 
      where: {
          BloodBankId: id
      }
  });
  return existInventory
  }
  catch(e){
    throw e;
  }
}


/*
@params : name
@Description : created findBloodGroup function for find blood group in database.
*/

exports.findBloodGroup = async(name)=>{
try{
 const bloodGroup = await bloodInventory.findOne({name})
 return bloodGroup
}
catch(e){
  throw e;
}
}


/*
@params : id,data
@Description : created updateInventory function for update blood inventory data in database.
*/

exports.updateInventory = async (id,data) =>{
  try{
    const inventory = await bloodInventory.update(data,{
     where:{
       BloodBankId : id
     }
    });
 
    return inventory;
  }
  catch(e){
   throw Error('Error :'+e);
  }
 }


 /*
@params : id,data
@Description : created updatePrice function for update price with matching blood bank id.
*/

 exports.updatePrice = async (id,data) =>{
  try{
    const Price = await bloodPrice.update(data,{
     where:{
       BloodBankId : id
     }
    });
    return Price;
  }
  catch(e){
   throw Error('Error :'+e);
  }
 }


 /*
@params : data
@Description : created createPayment function for create payment request for user account.
*/

 exports.createPayment = async(data) =>{
  try{
   const payment = await pay.create(data);
   return payment
  }
  catch(e){
    throw Error('Error :'+e);
  }
 }


 /*
@Description : created pendingBloodRequest function for check all pending blood requests.
*/

 exports.pendingBloodRequest = async()=>{
  try{
     const allPendingRequest = await bloodRequest.findAll({
      where:{
        status: 'pending'
      }
     })
     return allPendingRequest;
  }
  catch(e){
      throw e;
  }
}

/*
@params : id
@Description : created acceptBloodRequest function for update blood request status and for approved request.
*/

 exports.acceptBloodRequest = async(id)=>{
  try{
    const request = await bloodRequest.update({
      status : "Approved"
     },
     {
      where : {
       id : id
      }
     }
     )
     return request
  }
  catch(e){
    throw e;
  }
 } 

 /*
@params : id,collected
@Description : created collectBlood function for update donation request status to collected or not collected blood at blood bank.
*/

  exports.collectBlood = async(id,collected)=>{
  try{
    const request = await bloodRequest.update({
      status : collected
     },
     {
      where : {
       id : id
      }
     }
     )
     return request
  }
  catch(e){
    throw e;
  }
 } 

 /*
@params : id
@Description : created findBloodRequest function for find blood requests matching with their id.
*/

 exports.findBloodRequest = async(id)=>{
  try{
     const req = await bloodRequest.findOne({
      where:{
        id : id
      }
     })
     return req
  }
  catch(e){
    throw e;
  }
 }

 /*
@params : id,data
@Description : created makePayment function for update payment request with matching blood requests id.
*/

 exports.makePayment = async(id,data)=>{
  try{
    const payment = await pay.update(
      data,
    { 
      where: {
          BloodRequestId: id
      }
  });
  return payment
  }
  catch(e){
    throw e;
  }
 }

 /*
@params : id
@Description : created findBloodPrice function for check Selected blood group price in database.
*/

 exports.findBloodPrice = async(id)=>{
  try{
   const bloodGroup = await bloodPrice.findByPk(id,
  {include: bloodBank})
   return bloodGroup;
  }
  catch(e){
    throw e;
  }
 }

 /*
@params : id,data
@Description : created bloodRequestIncrement function for update blood inventory.
*/

 exports.bloodRequestIncrement = async(id,data)=>{
  try{
   const incre = await bloodInventory.update(data,{
    where:{
       BloodBankId:id
    }
   })
   return incre;
  }
  catch(e){
    throw e;
  }
 }


 /*
@params : id
@Description : created findBloodInventory function for find blood inventory of selected blood bank
*/

 exports.findBloodInventory = async(id)=>{
   try{
     const inventory = await bloodInventory.findOne({
      where:{
        BloodBankId:id
      }
     })
     return inventory;
   }
   catch(e){
    throw e;
   }
 }


 /*
@params : id
@Description : created findPaymentStatus function for check payment status of any user for blood request.
*/

 exports.findPaymentStatus = async(id)=>{
  try{
     const status = await pay.findOne({
      where:{
        BloodRequestId:id
      }
     })
     return status;
  }
  catch(e){
    throw e;
  }
 }


 /*
@params : id,data
@Description : created rejectRequestStatus function for update blood request status of any user for blood request.
*/

 exports.rejectRequestStatus = async(id,data)=>{
  try{
   const status = await bloodRequest.update(data,{
    where:{
       id:id
    }
   })
   return status;
  }
  catch(e){
    throw e;
  }
 }