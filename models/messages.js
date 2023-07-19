const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const orm = require('../config/orm');

class Messages extends Model {}

Messages.init(
  {     
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    room_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "rooms",
        key: "id",
      },
    },
    message_body: {
      type: DataTypes.STRING,
      allowNull: false, 
  },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "project",
  }
);

const messages = {
  name: 'messages',

  listAll: async function() {
      const result = await orm.selectAll(this.name)
      return result;
  },

  getRoomMsgs: async function(roomId) {
      const result = await orm.directQuery(
      `SELECT messages.room_id, users.display_name, messages.message_body 
      FROM messages LEFT JOIN users ON users.id = user_id WHERE room_id = ${roomId};`);
      return result;
  },

  // add message output: { user, channel, msg }
  addMsgToRoom: async function(userId, roomId, msg) {
      const variableQuery = `(user_id, room_id, message_body)`;
      const dataQuery = `(${userId}, ${roomId}, \'${msg}\')`;
      await orm.insertOne(this.name,variableQuery,dataQuery);
  },

  // delete all messages for 1 room output: { message: 'success' or 'failure' }
  removeMsgByRoom: async function(roomID) {
      const index = `room_id = ${roomID}`;
      await orm.deleteOne(this.name, index);
  }
};

module.exports = messages;

module.exports = Messages;
