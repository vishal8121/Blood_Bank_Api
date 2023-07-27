'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blood_bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  } 
  Blood_bank.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    logo:{
      type: DataTypes.STRING,
      allowNull: true
    },
    banner:{
      type: DataTypes.STRING,
      allowNull: true
    },
    license_no :{
     type: DataTypes.STRING,
     allowNull : false
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
    modelName: 'Blood_bank',
    tableName: 'blood_bank',
    paranoid: true,
    timestamps: true,
  }); 
  return Blood_bank;
};
