import CartDetail from "../../components/shoppingCart/cartDetail/cartDetail";
import ProductsDetail from "../../components/shoppingCart/productsDetail/productsDetail";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;  
  stock: number;
}
interface ShoppingCartProps {
  products: Product[];
}

export default function ShoppingCart({products}: ShoppingCartProps) {
  return (
    <section className="container mx-auto">
      <div className="h-10 font-bold my-2">
        <h2 className="text-2xl">Carrito de compras</h2> 
      </div>
      
      {products.length === 0 
        ? 
          <p> No hay productos en el carrito. </p>  
        : 
          <div className="w-full min-h-[calc(100vh/2)] flex flex-col justify-center items-center border rounded-lg p-2 
                          md:flex-row md:justify-between md:items-start ">
            <div className="w-full me-0 flex flex-col justify-center items-center border-1 rounded-lg
                            md:w-2/3 md: me-1">
              {products.map((product) => (
                <ProductsDetail 
                  key={product.id}
                  name={product.name} 
                  price={product.price} 
                  imageUrl={product.image}
                  stock={product.stock}
                />
              ))}
            </div>
            <div className="w-full ms-0 mt-3 flex flex-col justify-around items-center border-1 rounded-lg
                            md:w-1/3 md:ms-1 md:mt-0">
              <div className="w-full h-12 flex justify-center items-center ">
                <h3 className="text-xl font-medium">Resumen de la compra</h3>
              </div>
              <CartDetail 
                productsPrice={products.reduce((acc, product) => acc + product.price * product.stock, 0)} 
                total={products.reduce((acc, product) => acc + product.price * product.stock, 0)}   
              />
            </div>
          </div>
      }
    </section> 
  );
}