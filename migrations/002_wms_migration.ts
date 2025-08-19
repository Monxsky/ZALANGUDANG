import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create warehouses table
  const hasWarehouses = await knex.schema.hasTable("warehouses");
  if (!hasWarehouses) {
    await knex.schema.createTable("warehouses", (table) => {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.string("location", 255).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    });
  }

  // Create inventory table
  const hasInventory = await knex.schema.hasTable("inventory");
  if (!hasInventory) {
    await knex.schema.createTable("inventory", (table) => {
      table.increments("id").primary();
      table
        .integer("warehouse_id")
        .references("id")
        .inTable("warehouses")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable().defaultTo(0);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("inventory");
  await knex.schema.dropTableIfExists("warehouses");
}
