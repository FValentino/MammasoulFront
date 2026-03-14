import { getProductBySlug } from "@/actions/product.action";
import ProductDetail from "@/components/products/ProductDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  
  console.log("")
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
