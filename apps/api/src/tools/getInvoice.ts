import { prisma } from "@repo/db";

export async function getInvoiceDetails(invoiceNo: string) {
  const invoice = await prisma.invoice.findUnique({
    where: { invoiceNo }
  });

  if (!invoice) {
    return "Invoice not found";
  }

  return `Invoice ${invoice.invoiceNo} is ${invoice.status} for ${invoice.amount}`;
}
