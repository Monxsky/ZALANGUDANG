import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create users table
  const hasUsers = await knex.schema.hasTable("users");
  if (!hasUsers) {
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("username", 255).notNullable();
      table.string("password", 255).notNullable();
      table.string("role", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    });
  }

  // Create products table
  const hasProducts = await knex.schema.hasTable("products");
  if (!hasProducts) {
    await knex.schema.createTable("products", (table) => {
      table.increments("id").primary();
      table.string("sku", 255).notNullable().unique();
      table.string("name", 255).notNullable();
      table.integer("stock").notNullable().defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
    });
  }

  // Create transactions table
  const hasTransactions = await knex.schema.hasTable("transactions");
  if (!hasTransactions) {
    await knex.schema.createTable("transactions", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table
        .enum("type", ["in", "out"], {
          useNative: true,
          enumName: "transaction_type",
        })
        .notNullable();
      table.integer("quantity").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("transactions");
  await knex.schema.dropTableIfExists("products");
  await knex.schema.dropTableIfExists("users");
}
