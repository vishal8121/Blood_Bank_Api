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

exports.addBloodBankAdmin = async(data)=>{
  try{
    const admin = await bloodBankAdmin.create(data)
    return admin
  }
  catch(e){
    console.log(e);
  }
}

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


exports.addBloodUnits = async(units)=>{
  try{
    const addUnits = await bloodInventory.create(units);
    return addUnits;
  }
  catch(err){
    throw err;
  }
}

exports.addBloodUnitPrice = async(unitPrice)=>{
  try{
    const bloodUnit = await bloodPrice.create(unitPrice);
    return bloodUnit;
  }
  catch(err){
    throw err;
  }
}

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

exports.findBloodGroup = async(name)=>{
try{
 const bloodGroup = await bloodInventory.findOne({name})
 return bloodGroup
}
catch(e){
  throw e;
}
}

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

 exports.createPayment = async(data) =>{
  try{
   const payment = await pay.create(data);
   return payment
  }
  catch(e){
    throw Error('Error :'+e);
  }
 }

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