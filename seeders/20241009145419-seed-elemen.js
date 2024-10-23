'use strict';

const { v4 } = require('uuid');  

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('elemen', [
      {
        id: v4(),
        nama_elemen: 'Elemen 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        nama_elemen: 'Elemen 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        nama_elemen: 'Elemen 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('elemen', null, {});
  }
};
