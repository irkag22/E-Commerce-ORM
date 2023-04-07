const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const { stringify } = require('querystring');
const { INTEGER } = require('sequelize');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      product_id: {
        type: INTEGER,
        references: {
          model: 'product',
          key: 'id',
        },
        tag_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'tag',
            key: 'id',
          }
        }
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
