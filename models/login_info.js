const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class LoginInfo extends Model {}

LoginInfo.init(
  {
   user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    email: {
        type: DataTypes.STRING,
        unique:true, 
        allowNull: false,
        validate: {
            isEmail: true,
        },
  },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = LoginInfo;
