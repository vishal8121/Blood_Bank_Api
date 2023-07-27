const db = require('../models')
const User = db.user;
const bloodBank = db.bloodBank;
const Action = db.action;

/****************************************************************************** 
@params : userData
@Description : created addUser function for create user and save user data into database. if user data save into database this function return user data, if return error throw error

*******************************************************************************/
exports.addUser = async(userData)=>{
  try{
    const user = await User.create(userData)
    console.log(user)
    return user
  }
  catch(e){
    console.log(e);
  }
}

/****************************************************************************** 

@Description : created getUser function for get all user that stored in database. this function return user data.

*******************************************************************************/

exports.getUser = async()=>{
  try{
    const user = await User.findAll({})
    console.log(user)
    return user
  }
  catch(e){
    console.log(e);
  }
}









exports.getById = async(id)=>{
  try{
    const user = await User.findById({
      id: id
    })
    return user;
  }
  catch(e){
    console.log(e); 
  }
}

/****************************************************************************** 
@params : email
@Description : created checkEmail check existing email if email exists in database it return that user and if error occurs then throw error

*******************************************************************************/

exports.checkEmail = async (email) => {
  try {
      const user = await User.findOne({
          where: {
              email: email
          }
      })
      return user;
  } catch (e) {
      throw Error('Error:'+e)
  }
};



/****************************************************************************** 
@params : id, data
@Description : This function update the user details with matching user id and it return that user.

*******************************************************************************/

exports.updateUser = async (id,data) =>{
 try{
   const user = await User.update(data,{
    where:{
      id : id
    }
   });

   return user;
 }
 catch(e){
  throw Error('Error :'+e);
 }
}




// exports.logout = async(id)=>{
//   try{
//     const user = await User.update({status:"inactive"},{
//      where:{
//        id : id
//      }
//     });
 
//     return user;
//   }
//   catch(e){
//    throw Error('Error :'+e);
//   }
// }

/****************************************************************************** 
@params : id
@Description : This function Delete the user from database with matching user id and return.

*******************************************************************************/

exports.deleteUser = async (id) =>{
  try{
    const user = await User.destroy({
     where:{
       id:id
     }
    });
    return user;
  }
  catch(e){
   throw Error('Error :'+e);
  }
 
 }


 /**************************************************************************** 
  
@params : email
@Description : This function find the user from database with matching email  and update their status inactive to active and return that user. if user is not found then return user not found.

*******************************************************************************/

 exports.loginUser = async(email)=>{
   try{
      const oldUser = await User.findOne({
        where:{
          email : email
        }
      });

      if(oldUser != null){
        await User.update({
          status : 'active'},
          {where : {email : email}},
          );
        return oldUser;
      }
      else{
        console.log('User not exist')
      }  
  }
   catch(e){
    console.log("error"+e);
   }

 }


 exports.findId = async (id) => {
  try {
      const user = await User.findOne({ 
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

exports.findName = async (name) => {
  try {
      const user = await bloodBank.findOne({ 
          where: {
              name: name
          }
      })
      // console.log(user)
      return user;
  } catch (e) {
      throw e ;
  }
};

 exports.userRoleFilter = async (role) => {
  try {
      const users = await User.findAll({
          where : {
              role : role,
              status:"active"
          }
      })
      return users;
  } catch (e) {
      throw e;
  }
};

exports.bloodRequest = async(data)=>{
  try{
    const bloodReq = await Action.create(data)
    console.log(bloodReq)
    return bloodReq
  }
  catch(e){
    console.log(e);
  }
}