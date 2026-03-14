import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/data-source";
import { Visitor } from "@/backend/entities/Visitor";
import { Purchase } from "@/backend/entities/Purchase";
import { Product } from "@/backend/entities/Product";
import { UalaCheckoutService } from "@/services/uala/checkout.service";
import { PurchaseStatus } from "@/backend/entities/Enums";

export async function POST(req: Request) {
  try {
    const { clientData, details, description } = await req.json();

    if (!Array.isArray(details) || details.length === 0) {
      return NextResponse.json(
        { message: "Detalles de compra inválidos" },
        { status: 400 }
      );
    }

    const dataSource = await getDatabase();
    const visitorRepo = dataSource.getRepository(Visitor);
    const productRepo = dataSource.getRepository(Product);
    const purchaseRepo = dataSource.getRepository(Purchase);

    // 1. Buscar o crear visitante
    let visitor = await visitorRepo.findOne({
      where: { email: clientData.email },
    });

    if (!visitor) {
      const newVisitor = new Visitor();
      newVisitor.name = clientData.name;
      newVisitor.email = clientData.email;
      newVisitor.tel = clientData.tel;
      newVisitor.is_buyer = clientData.is_buyer ?? false;
      visitor = await visitorRepo.save(newVisitor);
    }

    // 2. Calcular total (SIN tocar stock)
    let total = 0;

    for (const item of details) {
      const product = await productRepo.findOne({
        where: { id: item.id },
      });

      if (!product) throw new Error("Producto no encontrado");
      if (product.stock && product.stock < item.quantity)
        throw new Error("Stock insuficiente");

      total += Number(product.price) * item.quantity;
    }

    // 3. Crear compra PENDING
    const newPurchase = new Purchase();
    newPurchase.client_id = visitor.id;
    newPurchase.status = PurchaseStatus.PENDING;
    newPurchase.total = total;
    newPurchase.cart_snapshot = details;
    const purchase = await purchaseRepo.save(newPurchase);

    // 4. Crear checkout Ualá
    const checkout = await UalaCheckoutService.createCheckout(
      total.toString(),
      description,
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/uala/webhook`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/compra/rechazada`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/compra/aprobada`,
      purchase.id.toString()
    );

    return NextResponse.json(checkout);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creando checkout" },
      { status: 500 }
    );
  }
}
