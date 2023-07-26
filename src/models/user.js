'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
    account_status:{
     type: DataTypes.STRING,
     allowNull:false
    },
    created_by:{
     type: DataTypes.STRING,
     allowNull: false,
    },
    updated_by:{
     type: DataTypes.STRING,
    },
    deletedAt:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    timestamps: true,
  });
  return User;
};

