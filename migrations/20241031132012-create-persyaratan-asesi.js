'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PersyaratanAsesis', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      persyaratan_asesi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis_persyaratan_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "JenisPersyaratanAsesis",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      skema_id: {  // Kolom foreign key untuk relasi dengan Skema
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Skemas',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Tambahkan defaultValue jika diperlukan
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Tambahkan defaultValue jika diperlukan
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PersyaratanAsesis');
  }
};
