import { useEffect, useState } from "react";
import { BackButton } from "../../components/common/ui";
import ClientRegisterForm from "../../components/purchase/clientRegisterForm";

export default function ClientRegister(){

  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(()=>{ 
    const localData = localStorage.getItem("shoppingCart");
    const cart = localData? JSON.parse(localData) : []

    setShowForm(cart.length > 0)
  },[] ) 

  return(
    <section className="container mx-auto flex flex-col justify-center items-center">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton /> <span className="text-sm"> Volver al inicio </span>
        <h2 className="ms-4 text-2xl font-bold"> Confirmar Compra </h2>
      </div>
      { 
        showForm
        ? 
          <div>
            <p className="text-lg my-2 text-center"> Para proceder con la compra rellene los siguientes datos </p>
            <div className="h-auto w-[50%] place-self-center flex flex-col justify-center rounded-2xl">
              <ClientRegisterForm/>
            </div>
          </div>
        :
          <p className="text-xl my-2 text-center"> El carrito esta vacio por favor seleccione al menos un producto para continuar con la compra</p>
      }
    </section>
  );
}