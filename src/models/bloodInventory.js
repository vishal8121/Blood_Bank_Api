'use strict';
const { request } = require('express');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bloodInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bloodInventory.belongsTo(models.bloodBank,{
        foreignKey:'bloodBank_id'
      })
    }
  }
  bloodInventory.init({
    
    a_positive_units: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    a_negative_units: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      b_positive_units: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      b_negative_units: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ab_positive_units: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ab_negative_units: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      o_positive_units: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      o_negative_units: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    bloodBank_id:{ 
      type: DataTypes.INTEGER,
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
    modelName: 'bloodInventory',
    tableName: 'blood_inventory',
    paranoid: true,
    timestamps: true,
  });
  return bloodInventory;
};

