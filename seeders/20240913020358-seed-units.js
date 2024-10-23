'use strict';

const { v4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Retrieve the ids of the inserted `judul_units`
    const judulUnits = await queryInterface.sequelize.query(
      `SELECT id FROM judul_units`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (judulUnits.length === 0) {
      throw new Error('Tidak ada data di tabel judul_units untuk digunakan sebagai referensi');
    }
    //id value dari 'judul unit'
    const judulUnitId1 = judulUnits[0].id; 
    const judulUnitId2 = judulUnits[1].id; 
    
    await queryInterface.bulkInsert('units', [
      {
        id: v4(),
        kode_unit: 'Kode Unit 1',
        judul_unit_id: judulUnitId1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        kode_unit: 'Kode Unit 2',
        judul_unit_id: judulUnitId2, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('units', null, {});
  },
};
