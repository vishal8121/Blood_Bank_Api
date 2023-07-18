module.exports=(sequelize,DataTypes)=>{
const User = sequelize.define('User', {
   name: {
     type: DataTypes.STRING,
     allowNull: false
    
   },

   email: {
     type: DataTypes.STRING,
     allowNull: "false", 
     unique: "true"
   },
   age: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   gender: {
     type: DataTypes.STRING,
     allowNull: false
   },
   blood_group:{
    type: DataTypes.STRING,
    allowNull: true
   },
   password:{
    type: DataTypes.STRING,
    allowNull: false
   },
   role:{
    type: DataTypes.ENUM("user","admin","Super_user"),
    allowNull: false
   },
   phone_number:{
    type: DataTypes.STRING,
    allowNull: false
   },
   address:{
    type: DataTypes.STRING,
    allowNull: false
   },
   last_donation_date:{
    type: DataTypes.DATE,
    allowNull: true
   },
   status:{
    type: DataTypes.STRING,
    allowNull: false
   },
   is_delete:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
   },
   created_by:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   updated_by:{
    type: DataTypes.STRING,
    allowNull: true
   }
},  {
  tableName: 'users'
});
    
return User;
}