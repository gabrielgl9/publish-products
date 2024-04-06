const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.operation.createMany({
    data: [
      { description: 'Create' },
      { description: 'Update' },
      { description: 'Delete' }
    ]
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });