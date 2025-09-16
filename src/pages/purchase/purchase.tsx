import { BackButton, Button } from "../../components/common/ui";
import type { ProductCart } from "../../types";
import ProductDetail from "../../components/purchase/productDetail";
import { useNavigate } from "react-router-dom";

export default function Purchase(){

  const navigate = useNavigate();

  const localShoppingCart = localStorage.getItem("shoppingCart");
  const products : ProductCart[] = localShoppingCart? JSON.parse(localShoppingCart) : [] 

  return(
    <section className="container mx-auto flex flex-col justify-center items-center">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> Confirmar Compra </h2>
      </div>
      { 
        products.length > 0
        ? 
          <div className="w-full">
            {
              products.map((product, index)=>(
                <ProductDetail product={product} index={index}/>
              ))
            }
            <div className="w-[50%] flex justify-around mx-auto">
              <div className="w-[30%]"> 
                <Button label="Volver" onClick={()=>navigate("/")}/>
              </div>
              <div className="w-[30%]"> 
                <Button label="Confirmar Compra" onClick={()=>navigate("/compra/aprobada")}/>
              </div>
            </div>
          </div>
        :
          <p className="text-xl my-2 text-center"> El carrito esta vacio por favor seleccione al menos un producto para continuar con la compra</p>
      }
    </section>
  );
}