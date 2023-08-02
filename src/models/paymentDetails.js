'use strict';
const { request } = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here 
      models.bloodRequest.hasOne(Payment);
      Payment.belongsTo(models.bloodRequest)
    }
  }
  Payment.init({
    transaction_id:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    payment_method:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_by:{
     type: DataTypes.STRING,
     allowNull: false,
    }, 
    updated_by:{
     type: DataTypes.STRING
    },
    status:{
     type: DataTypes.STRING,
     allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payment_details',
    paranoid: true,
    timestamps: true,
  });
  return Payment; 
};

