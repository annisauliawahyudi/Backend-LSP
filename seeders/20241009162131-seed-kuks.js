'use strict';

const { v4 } = require('uuid'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('kuks', [
      {
        id: v4(),  
        namaKriteria: 'Kriteria 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),  
        namaKriteria: 'Kriteria 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('kuks', null, {});
  }
};
