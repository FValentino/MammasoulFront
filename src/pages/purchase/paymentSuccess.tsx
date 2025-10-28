//import { CircleCheckBig } from "lucide-react";

import { useNavigate } from "react-router-dom";
//import { useHandlePaymentResult } from "../../hooks";
//import { useEffect } from "react";


export default function PaymentSuccess(){
  const navigate = useNavigate();

  //const state = useHandlePaymentResult()

  /*
  useEffect(()=>{
    if (state.success) {
      localStorage.removeItem("shoppingCart");
      localStorage.removeItem("purchase");
      localStorage.removeItem("visitor");
    }
  }, [state.success]);
  */
  return(
    <section className="w-[90vw] h-auto flex items-center justify-center mx-auto mt-16">
      <div className="w-full">
        {/*state.loading 
          ?  
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-32 h-32 border-8 border-t-8 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
              <p className="font-bold text-xl text-center mt-4">
                Procesando pago ...
              </p>
            </div>
          :
            <div className="w-full flex flex-col justify-center items-center">
              <CircleCheckBig className="w-[50vw] h-[50vw] md:w-[15vw] md:h-[15vw] text-[#208C07]"/>
              <p className="font-bold text-xl text-center mt-4">
                Pago aprobado
              </p>
              <p className="font-bold text-xl text-center w-full">
                Le enviaremos el recibo a su correo electronico
              </p>
            </div>
        */}
        <div className="w-full flex justify-center items-center mt-8">
          <button onClick={()=>{navigate("/")}} 
          className="w-auto text-center py-2 px-4 border rounded-full cursor-pointer">
            Volver al inicio
          </button>
        </div>
      </div>
    </section>
  );
}