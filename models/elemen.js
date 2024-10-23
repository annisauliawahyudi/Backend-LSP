'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Elemen extends Model {
    static associate(models) {
    }
  }

  Elemen.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nama_elemen: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Nama elemen tidak boleh kosong',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Elemen',
      tableName: 'elemen',
    }
  );
  return Elemen;
};
                