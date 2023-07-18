// Example from HW 14 from tutor. This is what our models index.js file should look like.
const User = require('./user');
const Messages = require('./messages');
const Login = require('./login_info');
const rooms =require('./rooms');



Login.belongsTo(User, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Messages.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

rooms.hasMany(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });


module.exports = {
  User,
  Messages,
  rooms,
  Login
};