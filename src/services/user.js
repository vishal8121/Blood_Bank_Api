const db = require('../model')
const User = db.user;
const sequelize = db.sequelize;

/****************************************************************************** 
@params : userData
@Description : created addUser function for create user and save user data into database. if user data save into database this function return user data, if return error throw error

*******************************************************************************/
exports.addUser = async(userData)=>{
  try{
    await sequelize.sync();
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
    await sequelize.sync();
    const user = await User.findAll({})
    console.log(user)
    return user
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
