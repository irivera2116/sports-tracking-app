const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const orm = require('../config/orm');

class Rooms extends Model {}

Rooms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
   
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'rooms',
  }
);


const room = {
    name: 'rooms',

    listAll: async function() {
        const result = await orm.selectAll(this.name)
        return result;
    },

    addNewRoom: async function(roomInput) {
        const varName = '(room_name)';
        const data = `('${roomInput}')`;
        await orm.insertOne(this.name, varName, data);
    },

    removeRoom: async function(roomID) {
        const index = `id = ${roomID}`;
        await orm.deleteOne(this.name, index);
    }
};

module.exports = room;
module.exports = Rooms;
