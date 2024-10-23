const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class KUK extends Model {}

KUK.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  namaKriteria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'KUK',
  tableName: 'kuks', 
  timestamps: true,
});

module.exports = KUK;
