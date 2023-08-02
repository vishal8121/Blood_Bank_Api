'use strict';
const { request } = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blood_Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Action.belongsTo(models.User,{
      //   foreignKey:'user_id'
      // })
      // Action.belongsTo(models.bloodBank,{ 
      //   foreignKey:'bloodBank_id'
      // })
      models.User.hasOne(Blood_Request);
      Blood_Request.belongsTo(models.User);

      models.bloodBank.hasOne(Blood_Request);
      Blood_Request.belongsTo(models.bloodBank); 

    }
  } 
  Blood_Request.init({
    
    type: {
      type: DataTypes.ENUM('request', 'donation'),
      allowNull: false
    },
    units: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'Blood_Request',
    tableName: 'blood_request',
    paranoid: true,
    timestamps: true,
  });
  return Blood_Request;
};

