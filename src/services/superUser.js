const db = require('../model')
const superUser = db.superUser;

/****************************************************************************** 
@params : userData
@Description : created addUser function for create superUser and save superUser data into database. if user data save into database this function return superUser data, if return error throw error

*******************************************************************************/
exports.addUser = async(userData)=>{
    try{
      const user = await superUser.create(userData)
      console.log(user)
      return user
    }
    catch(e){
      console.log(e);
    }
  }
  