type Data<T> = T | null

interface ButtonProps<T> {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
};

export default function Button<T> ( {label, onClick} : ButtonProps<T> ){
  return(
    <button onClick={()=>{ onClick() }}
      className="w-full text-md bg-[#525126] text-white font-bold py-2 my-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors">
      {label}
    </button>
  );
}