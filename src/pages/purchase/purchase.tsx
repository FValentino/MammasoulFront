import { BackButton, Button } from "../../components/common/ui";
import ProductDetail from "../../components/purchase/productDetail";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context";
import { useCheckout } from "../../hooks";

export default function Purchase(){

  const navigate = useNavigate();
  const {cart, total} = useCart();

  const { checkout, isLoading } = useCheckout();

  return(
    <section className="container mx-auto flex flex-col justify-center items-center">
      <div className="w-[90%] flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold"> Confirmar Compra </h2>
      </div>
      { 
        cart.length > 0
        ? 
          <div className="w-full">
            {
              cart.map((product, index)=>(
                <ProductDetail key={product.id} product={product} index={index}/>
              ))
            }
            <div className="w-full my-4 mx-auto flex justify-around items-center md:w-[50%]">
              <p className="font-medium text-xl">Total:</p>
              <p className="font-bold text-xl">$ {total}</p>
            </div>
            <div className="w-full md:w-[50%] flex justify-around mx-auto">
              <div className="w-[45%]"> 
                <Button label="Volver" onClick={()=>navigate("/")}/>
              </div>
              <div className="w-[45%]"> 
                <Button label="Confirmar Compra" onClick={()=>checkout()} isDisabled={isLoading}/>
              </div>
            </div>
          </div>
        :
          <p className="text-xl my-2 text-center"> El carrito esta vacio por favor seleccione al menos un producto para continuar con la compra</p>
      }
    </section>
  );
}