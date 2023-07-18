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
