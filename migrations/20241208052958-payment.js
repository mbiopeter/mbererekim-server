'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      equityAccount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      equityName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paybill: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paybillAccount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paybillName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sendMoneyNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sendMoneyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Payments');
  },
};
