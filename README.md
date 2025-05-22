# 🔧 Sequelize Migration & Seeding Guide

---

## 🧠 1. What is a Migration?

A **migration** in Sequelize is a way to **version control your database schema**. It allows you to **create, alter, or delete** database tables and columns in a consistent and trackable manner.

Think of it like **Git for your database schema**.

---

## ❓ 2. Why Do We Need Migrations?

- ✅ Team Collaboration: Everyone on the team gets the same DB schema.
- ✅ Versioning: Track changes and revert if needed.
- ✅ Automation: No need to run SQL manually.
- ✅ Environment Setup: Quickly set up databases in staging/production.

---

## ✅ 3. How Migrations Help Us

| Without Migrations           | With Migrations                      |
| ---------------------------- | ------------------------------------ |
| Manual DB changes            | Version controlled                   |
| Risky deployments            | Safe, reversible                     |
| Hard to track schema changes | History available in migration files |
| Errors in team sync          | Consistent across environments       |

---

## ⚠️ 4. What To Do / What Not To Do

### ✅ What to Do:

- Write migrations every time you change DB schema.
- Keep migrations small and descriptive.
- Use Sequelize CLI commands.
- Test migration and rollback locally.

### ❌ What Not to Do:

- Never manually alter production DB.
- Don’t edit old migration files once merged.
- Don’t ignore rollback methods (`down()` function).
- Avoid non-atomic migrations (partial failures).

---

## 🛠️ 5. Setup and Migration Commands

### Install Sequelize CLI and dependencies

```bash
npm install --save sequelize sequelize-cli pg pg-hstore # (for PostgreSQL)
```

### Initialize Sequelize

```bash
npx sequelize-cli init
```

This creates the following folders:

```
config/
models/
migrations/
seeders/
```

---

## 📌 6. Available Sequelize CLI Commands

| Command                             | Description                |
| ----------------------------------- | -------------------------- |
| `sequelize-cli init`                | Initialize Sequelize setup |
| `sequelize-cli model:generate`      | Generate model + migration |
| `sequelize-cli migration:generate`  | Create only migration      |
| `sequelize-cli db:migrate`          | Run all pending migrations |
| `sequelize-cli db:migrate:undo`     | Undo the last migration    |
| `sequelize-cli db:migrate:undo:all` | Undo all migrations        |
| `sequelize-cli db:migrate:status`   | Show migration status      |
| `sequelize-cli seed:generate`       | Generate a new seeder file |
| `sequelize-cli db:seed:all`         | Run all seeders            |
| `sequelize-cli db:seed:undo:all`    | Undo all seeders           |
| `sequelize-cli db:seed:undo`        | Undo latest seeder         |

---

## ✍️ 7. Migration File Structure

Each migration file has two methods:

```js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // logic for applying migration
  },
  down: async (queryInterface, Sequelize) => {
    // logic for reverting migration
  },
};
```

---

## 🏗️ 8. Creating Tables, Columns, Foreign Keys (Examples)

### 🔹 Creating a Table with Columns

```bash
npx sequelize-cli migration:generate --name create-users
```

```js
// In migration file
await queryInterface.createTable("Users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
```

---

### 🔹 Add / Remove / Rename Column

```bash
npx sequelize-cli migration:generate --name add-age-to-users
```

```js
await queryInterface.addColumn("Users", "age", {
  type: Sequelize.INTEGER,
  allowNull: true,
});
```

```js
await queryInterface.removeColumn("Users", "age");
await queryInterface.renameColumn("Users", "fullName", "name");
```

---

### 🔹 Foreign Key Example

```bash
npx sequelize-cli migration:generate --name add-userId-to-posts
```

```js
await queryInterface.addColumn("Posts", "userId", {
  type: Sequelize.INTEGER,
  references: {
    model: "Users",
    key: "id",
  },
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});
```

---

## 🌱 9. Seeding Your Database

### 📌 What is a Seeder?

A **seeder** populates your database with initial or test data.

---

### 📥 Creating a Seeder File

```bash
npx sequelize-cli seed:generate --name demo-user
```

---

### ✍️ Seeder File Structure

```js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "john@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
```

---

### ▶️ Running All Seeders

```bash
npx sequelize-cli db:seed:all
```

### ↩️ Undo All Seeders

```bash
npx sequelize-cli db:seed:undo:all
```

---

## ✅ 10. Tips for Seeders

- Use transaction to keep operations Atomic
- Use seeders for default roles, admin users, sample data.
- Keep seed data realistic for testing.
- Rollback seeders after tests if dummy data is seeded to clean up.
- Avoid using sensitive data in seeders.

---

