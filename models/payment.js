const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payments = sequelize.define('Payments', {
    equityAccount: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    equityName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    paybill: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    paybillAccount: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    paybillName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    sendMoneyNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    sendMoneyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },

}, {
    timestamps: true,
});

module.exports = Payments;
