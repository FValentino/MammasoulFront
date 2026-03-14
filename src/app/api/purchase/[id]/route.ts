import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/data-source";
import { Purchase } from "@/backend/entities/Purchase";
import { PurchaseDetail } from "@/backend/entities/PurchaseDetail";
import { Product } from "@/backend/entities/Product";
import { Visitor } from "@/backend/entities/Visitor";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  const purchaseId = Number(id);

  if (isNaN(purchaseId)) {
    return NextResponse.json(
      { message: "Invalid purchase id" },
      { status: 400 }
    );
  }

  const dataSource = await getDatabase();
  const purchaseRepo = dataSource.getRepository(Purchase);
  
  const purchase = await purchaseRepo.findOne({
    where: { id: purchaseId },
    relations: ["purchase_detail", "purchase_detail.product", "visitor"],
  });

  if (!purchase) {
    return NextResponse.json(
      { message: "Purchase not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(purchase);
}
