const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profiles = sequelize.define('Profiles', {
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    kra: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    signature: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },

}, {
    timestamps: true,
});

module.exports = Profiles;
