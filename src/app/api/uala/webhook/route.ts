import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/data-source";
import { Purchase } from "@/backend/entities/Purchase";
import { PurchaseDetail } from "@/backend/entities/PurchaseDetail";
import { Product } from "@/backend/entities/Product";
import { PurchaseStatus } from "@/backend/entities/Enums";
import { DataSource } from "typeorm";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const {
      external_reference,
      status,
      payment_id,
    } = payload;

    const purchaseId = Number(external_reference);

    if (!purchaseId) {
      return NextResponse.json(
        { message: "external_reference inválido" },
        { status: 400 }
      );
    }

    const dataSource = await getDatabase();
    const purchaseRepo = dataSource.getRepository(Purchase);
    const detailRepo = dataSource.getRepository(PurchaseDetail);
    const productRepo = dataSource.getRepository(Product);

    const purchase = await purchaseRepo.findOne({
      where: { id: purchaseId },
    });

    if (!purchase) {
      return NextResponse.json(
        { message: "Compra no encontrada" },
        { status: 404 }
      );
    }

    // Idempotencia
    if (purchase.status !== PurchaseStatus.PENDING) {
      return NextResponse.json({ message: "Compra ya procesada" });
    }

    if (status === "SUCCESS") {
      const snapshot = purchase.cart_snapshot as {
        product_id: number;
        price: number;
        quantity: number;
        subtotal: number;
      }[];

      for (const item of snapshot) {
        const product = await productRepo.findOne({
          where: { id: item.product_id },
        });

        if (!product) {
          throw new Error(`Producto ${item.product_id} no existe`);
        }

        if (product.stock !== null && product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${product.name}`);
        }

        // Crear detalle de compra
        const newDetail = new PurchaseDetail();
        newDetail.purchase_id = purchase.id;
        newDetail.product_id = item.product_id;
        newDetail.quantity = item.quantity;
        newDetail.price = item.price;
        newDetail.subtotal = item.subtotal;
        await detailRepo.save(newDetail);

        // Descontar stock
        if (product.stock !== null) {
          product.stock -= item.quantity;
          await productRepo.save(product);
        }
      }

      // Marcar compra como exitosa
      purchase.status = PurchaseStatus.SUCCESS;
      purchase.payment_id = payment_id;
      await purchaseRepo.save(purchase);
    } else {
      // Pago rechazado
      purchase.status = PurchaseStatus.REJECTED;
      purchase.payment_id = payment_id;
      await purchaseRepo.save(purchase);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}
