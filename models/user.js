const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const orm = require('../config/orm');

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
        display_name: {
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

const user = {
    name: 'users',

    listAll: async function() {
        const result = await orm.selectAll(this.name);
        return result;
    },

    addNew: async function(loginID, firstName, lastName, displayName) {
        const vars = '(id, first_name, last_name, display_name)';
        const data = `(${loginID}, '${firstName}', '${lastName}', '${displayName}')`;
        await orm.insertOne(this.name, vars, data);
    },

    updateFirstName: async function(loginID, newFirstName) {
        const change = `first_name = '${newFirstName}'`;
        const index = `id = ${loginID}`;
        await orm.updateOne(this.name, change, index);
    },

    updateLastName: async function(loginID, newLastName) {
        const change = `last_name = '${newLastName}'`;
        const index = `id = ${loginID}`;
        await orm.updateOne(this.name, change, index);
    },

    updateDisplayName: async function(loginID, newDisplayName) {
        const change = `display_name = '${newDisplayName}'`;
        const index = `id = ${loginID}`;
        await orm.updateOne(this.name, change, index);
    },

    getUserInfo: async function(accesskey) {
        const result = await orm.findOne(
            'users LEFT JOIN login_info ON login_info.id = id',
            'users.id, users.display_name, users.avatar_dirct',
            `login_info.user_name = \'${accesskey}\';`
        )
        return result[0];
    }
};

module.exports = user;
module.exports = User; // Export the User model
