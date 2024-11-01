'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JenisPersyaratanAsesis', {
      id: {
        type: Sequelize.UUID, // Ubah dari INTEGER menjadi UUID
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false, // pastikan ini sesuai
      },
      jenis_persyaratan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JenisPersyaratanAsesis');
  }
};
