'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
       
      },
   
      email: {
        type: Sequelize.STRING,
        allowNull: "false", 
        unique: "true"
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      blood_group:{
       type: Sequelize.STRING,
       allowNull: true
      },
      password:{
       type: Sequelize.STRING,
       allowNull: false
      },
      role:{
       type: Sequelize.ENUM("user","admin","Super_user"),
       allowNull: false
      },
      phone_number:{
       type: Sequelize.STRING,
       allowNull: false
      },
      address:{
       type: Sequelize.STRING,
       allowNull: false
      },
      last_donation_date:{
       type: Sequelize.DATE,
       allowNull: true
      },
      status:{
       type: Sequelize.STRING,
       allowNull: false
      },
      account_status:{
       type: Sequelize.STRING,
       allowNull:false
      },
      created_by:{
       type: Sequelize.STRING,
       allowNull: false,
      },
      updated_by:{
       type: Sequelize.STRING,
      },
      createdAt:{
        type: Sequelize.STRING,
      },
      updatedAt:{
        type: Sequelize.STRING,
      },
      deletedAt:{
        type: Sequelize.STRING,
      },
    },{
      paranoid: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};

