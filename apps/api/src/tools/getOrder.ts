import { prisma } from "@repo/db";

export async function getOrderDetails(orderNo: string) {
  const order = await prisma.order.findUnique({
    where: { orderNo }
  });

  if (!order) {
    return "Order not found";
  }

  return `Order ${order.orderNo} is ${order.status} and amount is ${order.amount}`;
}
