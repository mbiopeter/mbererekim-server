const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Quotations = require('./quotations');

const Items = sequelize.define('Items', {
    quoteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    rate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    cts: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },

}, {
    timestamps: true,
});


module.exports = Items;
