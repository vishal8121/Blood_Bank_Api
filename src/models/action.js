'use strict';
const { request } = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Action.belongsTo(models.User,{
        foreignKey:'user_id'
      })
      Action.belongsTo(models.bloodBank,{ 
        foreignKey:'bloodBank_id'
      })
    }
  }
  Action.init({
    
    type: {
      type: DataTypes.ENUM('request', 'donation'),
      allowNull: false
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    }, 
    bloodBank_id:{ 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blood_group:{
     type: DataTypes.STRING,
     allowNull: true
    },
    status:{
     type: DataTypes.STRING,
     allowNull: false
    },
    created_by:{
     type: DataTypes.STRING,
     allowNull: false,
    },
    updated_by:{
     type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Action',
    tableName: 'action',
    paranoid: true,
    timestamps: true,
  });
  return Action;
};

