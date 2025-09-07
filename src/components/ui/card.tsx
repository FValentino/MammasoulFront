import Button from "./button";
import type { Data } from "../../types/generic";


type ButtonProps<T> = {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
};

interface CardProps<T> {
  image : string;
  title : string;
  description? : string;
  buttons? : ButtonProps<T>[];
}

export default function Card<T>( { image, title, description, buttons }: CardProps<T>) {
  return (
    <div className="bg-white h-auto rounded-2xl border-1 border-[#313030] p-2 overflow-hidden relative">

      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-2 flex flex-col gap-2">
        <div className="w-full h-12  ">
          <h3 className="text-md font-bold flex items-center justify-center text-center">{title}</h3>
        </div>
        <div className={description? "w-full flex items-center justify-center h-6 visible" : "hidden"}>
          <p className="text-md  text-[#313030] font-semibold text-center my-2 md:text-sm">{description}</p>
        </div>
        {
          buttons 
          ? 
            <div>
              {buttons?.map((button : ButtonProps<T>, index)=>(<Button key={index} label={button.label} onClick={button.onClick}/>) )}
            </div>
          :""
        }
      </div>
    </div>
  );
};
