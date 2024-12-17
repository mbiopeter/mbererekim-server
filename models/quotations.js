const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Quotations = sequelize.define('Quotations', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },

}, {
    timestamps: true,
});



module.exports = Quotations;
