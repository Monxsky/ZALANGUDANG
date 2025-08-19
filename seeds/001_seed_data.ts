import type { Knex } from "knex";
import * as bcrypt from "bcrypt";

export async function up(knex: Knex): Promise<void> {
  // Seed users
  const usersExist = await knex("users").first();
  if (!usersExist) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await knex("users").insert([
      { username: "admin", password: hashedPassword, role: "admin" },
      { username: "staff", password: hashedPassword, role: "staff" },
    ]);
  }

  // Seed products
  const productsExist = await knex("products").first();
  if (!productsExist) {
    await knex("products").insert([
      { sku: "SKU001", name: "Product A", stock: 100 },
      { sku: "SKU002", name: "Product B", stock: 200 },
    ]);
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex("transactions").del();
  await knex("products").del();
  await knex("users").del();
}
