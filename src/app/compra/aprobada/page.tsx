import { notFound } from "next/navigation";

interface PageProps {
  searchParams: {
    external_reference?: string;
  };
}

async function getPurchase(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/purchase/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function CompraAprobadaPage({
  searchParams,
}: PageProps) {
  const purchaseId = searchParams.external_reference;

  if (!purchaseId) {
    notFound();
  }

  const purchase = await getPurchase(purchaseId);

  if (!purchase || purchase.status !== "APPROVED") {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        ¡Compra confirmada!
      </h1>

      <p className="mb-4">
        Orden #{purchase.id}
      </p>

      <ul className="divide-y">
        {purchase.details.map((item: any) => (
          <li key={item.id} className="py-4 flex justify-between">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>
              ${item.subtotal}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right font-bold text-xl">
        Total: ${purchase.total}
      </div>
    </main>
  );
}
