import { CircleCheckBig } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function PaymentSuccess(){
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.removeItem("shoppingCart");
    localStorage.removeItem("visitor");
  }, []);

  return(
    <section className="w-[90vw] h-auto flex items-center justify-center mx-auto mt-16">
      <div className="w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <CircleCheckBig className="w-[50vw] h-[50vw] md:w-[15vw] md:h-[15vw] text-[#208C07]"/>
          <p className="font-bold text-xl text-center mt-4">
            Pago aprobado
          </p>
          <p className="font-bold text-xl text-center w-full">
            Le enviaremos el recibo a su correo electronico, en caso de no verlo en la bandeja de entrada
            revise la pestaña de spam
          </p>
        </div>
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