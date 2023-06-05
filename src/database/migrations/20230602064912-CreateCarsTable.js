'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      build: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.NUMBER,
      },
      mode: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.NUMBER,
        references: 'users',
        referencesKey: 'id'
      },
      geolocation: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.NUMBER,
      },
      is_feature: {
        type: Sequelize.BOOLEAN,
      },
      status: {
        type: Sequelize.STRING,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
