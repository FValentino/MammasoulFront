import { getCategories } from "@/actions/category.actions";
import { getProducts } from "@/actions/product.action";
import ProductsClient from "@/components/products/Products.client";

interface Props {
  searchParams: Promise< {
    categoria?: string;
  }>;
}

export default async function Products({ searchParams }: Props) {
  const products  = await getProducts();
  const categories = await getCategories();

  const { categoria } = await searchParams;


  const initialSelectedCategories = categoria ? categoria.split(",") : [];

  console.log("Initial selected categories:", initialSelectedCategories);

  return (
    <ProductsClient
      initialProducts={products}
      categories={categories}
      initialSelectedCategorySlugs={initialSelectedCategories}
    />
  );
}
