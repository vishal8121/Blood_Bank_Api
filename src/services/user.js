const db = require('../model')
const User = db.user;
const sequelize = db.sequelize;

/*
Description : created addUser function for create user and save user data into database. if user data save into database this function return user data, if return error throw error
*/
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
