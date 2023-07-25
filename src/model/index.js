const  {Sequelize,DataTypes}  = require('sequelize');

// Include database connection file
const sequelize = require("../config/connection")


// Create db Object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Include user model file
db.user = require('./user')(sequelize, DataTypes);
db.bloodBank = require('./bloodBank')(sequelize, DataTypes);
db.sequelize.sync();


// export db object
module.exports = db;