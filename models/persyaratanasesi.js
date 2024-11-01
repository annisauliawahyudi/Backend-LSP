"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PersyaratanAsesi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.JenisPersyaratanAsesi, { foreignKey: "jenis_persyaratan_id", as: "JenisPersyaratanAsesi"});
      // Relasi ke tabel Skema
      this.belongsTo(models.Skema, { foreignKey: "skema_id", as: "skema" });
    }
  }
  PersyaratanAsesi.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      persyaratan_asesi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kode unit tidak boleh kosong",
          },
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      jenis_persyaratan_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "JenisPersyaratanAsesi",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      skema_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "skemas",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "PersyaratanAsesi",
    }
  );
  return PersyaratanAsesi;
};
