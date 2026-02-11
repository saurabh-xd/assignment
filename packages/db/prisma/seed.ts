import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';



const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
  });

async function main() {
  console.log("Seeding database...");

 
  await prisma.order.deleteMany();
  await prisma.invoice.deleteMany();

 
  await prisma.order.create({
    data: {
      orderNo: "ORD-001",
      status: "shipped",
      amount: 999,
    },
  });

  await prisma.order.create({
    data: {
      orderNo: "ORD-002",
      status: "processing",
      amount: 499,
    },
  });

  
  await prisma.invoice.create({
    data: {
      invoiceNo: "INV-001",
      amount: 999,
      status: "paid",
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNo: "INV-002",
      amount: 499,
      status: "pending",
    },
  });

  console.log("Seed complete");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
