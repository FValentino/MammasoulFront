import Image from "next/image";
import { ReactNode } from "react";


interface CardProps<T> {
  image: string;
  title: string;
  description?: string;
  detail?: string;
  buttons?: ReactNode[];
}

export default function Card<T>( { image, title, detail, buttons }: CardProps<T>) {
  return (
    <div className="w-60 bg-white h-full rounded-2xl flex flex-col border-[#313030] overflow-hidden relative mx-auto">
      <div className="bg-[linear-gradient(135deg,#bdbfc1,#e8eaea)] flex items-center justify-center aspect-square relative w-full"> 
        <Image src={image} alt={title} fill />
      </div>

      <div className=" mt-2 flex flex-col gap-2 p-2 h-full">
        <div className="w-full flex justify-center items-center grow">
          <h3 className="text-md h-full font-bold text-center min-h-[2 rem] ">{title}</h3>
        </div>
        <div className={detail? "w-full flex items-center justify-center h-4 visible" : "hidden"}>
          <p className="text-lg text-[#313030] font-semibold text-center my-2 md:text-lg">{detail}</p>
        </div>
        {
          buttons 
          ? 
            <div className="w-[90%] mx-auto ">
              {buttons?.map((button : ReactNode, index)=>( <div key={index}> {button} </div>))}
            </div>
          :""
        }
      </div>
    </div>
  );
};
