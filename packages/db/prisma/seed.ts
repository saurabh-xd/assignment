import { prisma } from "../src";

async function main() {
  await prisma.order.createMany({
    data: [
      { orderNo: "ORD-001", status: "shipped", amount: 120 },
      { orderNo: "ORD-002", status: "processing", amount: 80 }
    ]
  });

  await prisma.invoice.createMany({
    data: [
      { invoiceNo: "INV-001", amount: 120, status: "paid" },
      { invoiceNo: "INV-002", amount: 80, status: "pending" }
    ]
  });

  console.log("Seeded DB");
}

main();
