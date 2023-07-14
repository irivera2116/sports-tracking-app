const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// User model definition
class User extends Model {
    // Checks if a provided password matches the hashed password in the User instance
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}
// User model initialization
User.init(
    {
        // User attributes
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        email: {
            type: DataTypes.STRING,
            unique:true, 
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    {
        // executed before creating and updating User records
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updateUserData) => {
                updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
                return updateUserData;
            },
        },
        sequelize,   // Sequelize instances for the User model
        timestamps: true, // Adds createdAt and updateAt fields to the User model
        freezeTableName: true, // Prevents pluralization of the table name
        underscored: true, // Uses snake_case for the column names
        modelName: 'user', // Sets the model name to 'user'
    }  
);

module.exports = User; // Export the User model
