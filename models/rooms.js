// Tutor says this does not look correct. Need the model.init() function.

const config = require("../config/connection");

const rooms={

    name:'rooms',

    listAll: async function(){
        const result = await config.selectAll(this.name)
        return result; // if error try this : return result.rows;
    }
};

module.exports = rooms;



