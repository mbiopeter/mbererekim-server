// /config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'electronicquotation',
    'mbererekim',
    'austropithecus!',
    {
        host: 'mbererekim.cpko42qeaxdt.eu-north-1.rds.amazonaws.com',
        dialect: 'mysql',
        port: 3306, 
    }
);

module.exports = sequelize;