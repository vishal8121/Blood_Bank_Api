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
      models.bloodBank.hasOne(bloodInventory,{
        onDelete: 'CASCADE',
      });
      bloodInventory.belongsTo(models.bloodBank)
    }
  }
  bloodInventory.init({
    
    a_positive: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    a_negative: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      b_positive: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      b_negative: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ab_positive: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ab_negative: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      o_positive: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      o_negative: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    created_by:{
     type: DataTypes.STRING,
     allowNull: false,
    },
    updated_by:{
     type: DataTypes.STRING
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

