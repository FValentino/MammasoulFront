import { Link} from "react-router-dom";
import type { Category } from "../../types/category";

interface CardProps{
  category: Category;
}


export default function Card ({category}: CardProps) {

  return (
    <div className="w-[50%] mx-auto sm:w-auto bg-white h-auto rounded-2xl border-1 border-[#313030] p-2 overflow-hidden relative">

      <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />

      <div className="p-2 flex flex-col gap-2">
        <Link to={`/categoria/${category.id}`} state={{name: category.name, id:category.id}}
          className="text-center mt-2 bg-[#525126] text-white font-bold py-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors">
          {category.name}
        </Link>
      </div>
    </div>
  );
};
