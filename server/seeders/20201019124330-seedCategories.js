'use strict';

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
   await queryInterface.bulkInsert('Categories', [
      {
        name: 'Fashion',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Toys, Hobby, & DIY',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Electronics & Media',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Food & Personal Care',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Furniture & Appliances',
        createdAt: new Date,
        updatedAt: new Date
      }
    ],{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
