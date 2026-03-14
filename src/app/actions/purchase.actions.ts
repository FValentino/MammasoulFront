'use server'

import { getDatabase } from "@/lib/data-source";
import { Purchase } from "@/backend/entities/Purchase";
import { PurchaseDetail } from "@/backend/entities/PurchaseDetail";

export async function getPurchaseById(purchaseId: number) {
  if (isNaN(purchaseId)) {
    throw new Error("Invalid purchase id");
  }

  const dataSource = await getDatabase();
  const purchaseRepo = dataSource.getRepository(Purchase);

  const purchase = await purchaseRepo.findOne({
    where: { id: purchaseId },
    relations: ["purchase_detail", "purchase_detail.product", "visitor"],
  });

  if (!purchase) {
    throw new Error("Purchase not found");
  }

  return purchase;
}
