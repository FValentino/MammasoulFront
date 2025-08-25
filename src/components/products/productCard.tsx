// Card.tsx

interface CardProps {
  name: string;
  price: number;
  image: string;
}

export default function Card ({name, price, image}: CardProps) {
  return (
    <div className="bg-white h-auto rounded-2xl border-1 border-[#313030] p-2 overflow-hidden relative">

      <img src={image} alt={name} className="w-full h-48 object-cover" />

      <div className="p-2 flex flex-col gap-2">
        <h3 className="text-sm font-medium h-12 flex items-center">{name}</h3>
        <p className="text-[#313030] font-semibold">$ {price}</p>
        <button className="mt-2 bg-[#525126] text-white font-bold py-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};
