"use server";

import { cookies } from "next/headers";

export async function addToCart(productId: number, quantity = 1) {
  const cookieStore = cookies();
  const cart = JSON.parse((await cookieStore).get("cart")?.value ?? "[]");

  const existing = cart.find((p: any) => p.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  (await cookieStore).set("cart", JSON.stringify(cart), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
}
