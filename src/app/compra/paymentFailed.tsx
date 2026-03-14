import { CircleX } from "lucide-react";
import Link from "next/link";


export default function PaymentFailed(){

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
          <Link href={"/"}
          className="w-auto text-center py-2 px-4 border rounded-full cursor-pointer">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}