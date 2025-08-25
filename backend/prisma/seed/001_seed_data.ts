import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { username: 'admin', email: 'admin@example.com', password: 'admin123', role: 'ADMIN' },
    { username: 'john', email: 'john@example.com', password: 'john123', role: 'USER' },
    { username: 'jane', email: 'jane@example.com', password: 'jane123', role: 'USER' },
  ];

  const usersWithHashedPasswords = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

  await Promise.all(
    usersWithHashedPasswords.map((user) =>
      prisma.user.create({ data: user })
    )
  );

  const products = [
    { name: 'Product A', description: 'This is Product A', price: 100 },
    { name: 'Product B', description: 'This is Product B', price: 150 },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        sku: {
          create: [
            { code: `${product.name}-SKU1`, stock: 50 },
            { code: `${product.name}-SKU2`, stock: 30 },
          ],
        },
      },
    });
  }

  console.log("Seed data berhasil dibuat!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
