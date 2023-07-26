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
      Blood_bank.hasOne(models.Action);
      models.Action.belongsTo(Blood_bank);  
    }
  } 
  Blood_bank.init({
    name: {
      type: DataTypes.STRING,
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
