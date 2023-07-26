'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
      const encryptedPassword = await bcrypt.hash('Super@1234', 10);
      await queryInterface.bulkInsert('users', [{
        name: 'Super User',
        email: 'su.superuser@gmail.com',
        age: '25',
        gender: 'male',
        password: encryptedPassword,
        phone_number: '9816898121',
        address: 'Chandigarh',
        status: 'inactive',
        account_status: 'activated',
        created_by: 'Super User',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:*/
     await queryInterface.bulkDelete('users', null, {});
    
  }
};
