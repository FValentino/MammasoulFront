type Data<T> = T | null

interface ButtonProps<T> {
  label: string;
  onClick: (...args: Data<T>[]) => void; 
  isDisabled?: boolean; 
};

export default function Button<T> ( {label, onClick, isDisabled} : ButtonProps<T> ){
  return(
    <button onClick={()=>{ onClick() }}
      className={`w-full text-md bg-[#525126] text-white font-bold py-2 my-2 rounded 
                hover:bg-[#525126]/90 hover:cursor-pointer transition-colors`} 
      disabled={isDisabled}>
      {
        isDisabled 
        ?
          <div className="w-full h-auto flex justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white me-2"></div>
            Procesando pago
          </div>
        :
          label 
      }
    </button>
  );
}