import Button from "./button";
import type { Data } from "../../../types";


type ButtonProps<T> = {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
};

interface CardProps<T> {
  image: string;
  title: string;
  description?: string;
  detail?: string;
  buttons?: ButtonProps<T>[];
}

export default function Card<T>( { image, title, detail, buttons }: CardProps<T>) {
  return (
    <div className="w-60 bg-white h-auto rounded-2xl flex flex-col border-[#313030] overflow-hidden relative">
      <div className="bg-[linear-gradient(135deg,#bdbfc1,#e8eaea)] flex items-center justify-center ">
        <img src={image} alt={title} className="object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-full h-10 flex justify-center items-center overflow-hidden">
          <h3 className="text-md font-bold text-center truncate">{title}</h3>
        </div>
        <div className={detail? "w-full flex items-center justify-center h-4 visible" : "hidden"}>
          <p className="text-lg text-[#313030] font-semibold text-center my-2 md:text-lg">{detail}</p>
        </div>
        {
          buttons 
          ? 
            <div className="w-[80%] mx-auto ">
              {buttons?.map((button : ButtonProps<T>, index)=>(<Button key={index} label={button.label} onClick={button.onClick}/>) )}
            </div>
          :""
        }
      </div>
    </div>
  );
};
