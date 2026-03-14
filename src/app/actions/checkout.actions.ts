'use server'

import { getDatabase } from "@/lib/data-source";
import { Visitor } from "@/backend/entities/Visitor";
import { Purchase } from "@/backend/entities/Purchase";
import { Product } from "@/backend/entities/Product";
import { UalaCheckoutService } from "@/services/uala/checkout.service";
import { PurchaseStatus } from "@/backend/entities/Enums";
import { CheckoutResponse } from "@/types/checkout";

interface CheckoutParams {
  clientData: {
    name: string;
    email: string;
    phone: string;
  };
  details: Array<{
    id: number;
    quantity: number;
  }>;
  description: string;
}

export async function createCheckout(
  params: CheckoutParams
): Promise<CheckoutResponse> {
  const { clientData, details, description } = params;

  if (!Array.isArray(details) || details.length === 0) {
    throw new Error("Detalles de compra inválidos");
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
    newVisitor.tel = clientData.phone;
    newVisitor.is_buyer = false;
    visitor = await visitorRepo.save(newVisitor);
  }

  // 2. Calcular total
  let total = 0;
  const cartItems: Array<{
    product_id: number;
    price: number;
    quantity: number;
    subtotal: number;
  }> = [];

  for (const item of details) {
    const product = await productRepo.findOne({
      where: { id: item.id },
    });

    if (!product) {
      throw new Error(`Producto no encontrado: ${item.id}`);
    }

    if (product.stock && product.stock < item.quantity) {
      throw new Error(`Stock insuficiente para ${product.name}`);
    }

    const price = Number(product.price);
    const subtotal = price * item.quantity;
    total += subtotal;

    cartItems.push({
      product_id: product.id,
      price,
      quantity: item.quantity,
      subtotal,
    });
  }

  // 3. Crear compra PENDING
  const newPurchase = new Purchase();
  newPurchase.client_id = visitor.id;
  newPurchase.status = PurchaseStatus.PENDING;
  newPurchase.total = total;
  newPurchase.cart_snapshot = cartItems;
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

  return checkout;
}
