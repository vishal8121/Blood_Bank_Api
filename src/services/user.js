const db = require('../model')
const User = db.user;
const sequelize = db.sequelize;

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
