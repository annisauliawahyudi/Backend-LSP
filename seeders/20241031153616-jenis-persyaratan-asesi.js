'use strict';
const { v4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('JenisPersyaratanAsesis', [
      {
        id: v4(),
        jenis_persyaratan: 'Persyaratan Dasar',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        jenis_persyaratan: 'Persyaratan Administratif',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JenisPersyaratanAsesis', null, {});
  }
};
