import BackButton  from "@/components/common/ui/buttons/BackButton";
import ImagesGalery from "@/components/products/ImageGalery";
import AddCartButton from "@/components/common/ui/buttons/AddCartButton";
import { notFound } from "next/navigation";
import { ProductDTO } from "@/types";

interface Props {
  product: ProductDTO;
}

export default async function ProductPage({ product }: Props) {

  if (!product) notFound();

  console.log("ProductDetail -> product", product);

  return (
    <main className="container mx-auto">
      <div className="w-[90%] mx-auto my-4">
        <BackButton />
      </div>

      <div className="w-[90%] flex flex-col rounded-lg mx-auto md:flex-row md:items-center">
        <div className="w-full p-2">
          <ImagesGalery images={product.product_images ?? []} />
        </div>

        <div className="w-full mt-3">
          <div className="w-[90%] mx-auto">
            <h1 className="text-3xl text-center font-bold lowercase first-letter:uppercase">
              {product.name}
            </h1>

            <p className="text-lg mt-3 text-center font-medium">
              {product.description}
            </p>
          </div>

          <div className="border-t my-4" />

          <div className="w-full flex justify-around my-2">
            <p className="text-xl font-bold">$ {product.price}</p>
            <p className="text-xl">Disponibles: {product.stock}</p>
          </div>

          <div className="w-full flex justify-center mt-4">
            <div className="w-auto md:w-[50%]">
              <AddCartButton product={{...product, quantity: 1, subtotal: product.price}} />
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
