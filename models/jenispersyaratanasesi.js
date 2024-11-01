'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JenisPersyaratanAsesi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.PersyaratanAsesi, {foreignKey: 'jenis_persyaratan_id', as: "persyaratan_asesi"})
    }
  }
  JenisPersyaratanAsesi.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    jenis_persyaratan: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'JenisPersyaratanAsesi',
  });
  return JenisPersyaratanAsesi;
};