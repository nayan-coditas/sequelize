"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        // references: {
        //   model: "users",
        //   key: "id",
        // },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });

    await queryInterface.addConstraint("posts", {
      fields: ["userId"],
      type: "foreign key",
      name: "posts_userId_fkey", // custom name for constraint
      references: {
        table: "users",
        field: "id",
      },
      unique: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("posts", "posts_userId_fkey");
    await queryInterface.dropTable("posts");
  },
};
