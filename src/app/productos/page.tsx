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

  console.log("PRODUCTS PAGE: ", products)
  console.log("PRODUCTS IMAGES: ", products.map(products => products.product_images))


  const initialSelectedCategories = categoria ? categoria.split(",") : [];

  return (
    <ProductsClient
      initialProducts={products}
      categories={categories}
      initialSelectedCategorySlugs={initialSelectedCategories}
    />
  );
}
