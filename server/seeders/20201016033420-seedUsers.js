'use strict';
const bcrypt = require('bcryptjs')
let salt = bcrypt.genSaltSync(10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        fullname: 'admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('123456', salt),
        RoleId: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        fullname: 'user',
        email: 'user@mail.com',
        password: bcrypt.hashSync('123456', salt),
        RoleId: 2,
        createdAt: new Date,
        updatedAt: new Date
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
