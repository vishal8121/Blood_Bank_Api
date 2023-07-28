const db = require('../models')
const bloodBankAdmin = db.user;
const bloodBank = db.bloodBank;

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
    console.log(e);
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

