"use strict";

const sequelize = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize
      .query(`Insert into users (id, name, email, "createdAt", "updatedAt", "deletedAt") VALUES
      ('12345678-1234-1234-1234-123456789012', 'John Doe', 'john@gmail.com', NOW(), NOW(), NULL);`);
    await queryInterface.sequelize.query(
      `INSERT INTO posts (id, title, content, "userId", "createdAt", "updatedAt", "deletedAt") VALUES
        ('1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6', 'First Post', 'This is the content of the first post.', '12345678-1234-1234-1234-123456789012', NOW(), NOW(), NULL),
        ('7g8h9i0j-k1l2-m3n4-o5p6-1a2b3c4d5e6f', 'Second Post', 'This is the content of the second post.', '12345678-1234-1234-1234-123456789012', NOW(), NOW(), NULL),
        ('0j1k2l3m-n4o5-p6q7-r8s9-t0u1v2w3x4y5', 'Third Post', 'This is the content of the third post.', '12345678-1234-1234-1234-123456789012', NOW(), NOW(), NULL);`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DELETE FROM posts WHERE id IN ('1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6', '7g8h9i0j-k1l2-m3n4-o5p6-1a2b3c4d5e6f', '0j1k2l3m-n4o5-p6q7-r8s9-t0u1v2w3x4y5');`
    );
    await queryInterface.sequelize.query(
      `DELETE FROM users WHERE id = '12345678-1234-1234-1234-123456789012';`
    );
  },
};
