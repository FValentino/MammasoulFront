import { CircleX } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function PaymentFailed(){
  const navigate = useNavigate();

  return(
    <section className="w-[90vw] h-auto flex items-center justify-center mx-auto mt-16">
      <div className="w-full">
        <div className="w-full flex flex-col justify-center items-center">
          <CircleX className="w-[50vw] h-[50vw] md:w-[15vw] md:h-[15vw] text-[#960B0B]"/>
          <p className="font-bold text-xl text-center mt-4">
            Pago rechazado 
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