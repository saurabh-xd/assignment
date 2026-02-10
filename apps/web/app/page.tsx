import { prisma } from "@repo/db";

export default async function Home() {
  const order = await prisma.order.findFirst();

  return (
    <div>
      {order ? order.orderNo : "No order found"}
    </div>
  );
}
