
interface CartDetailProps {
  productsPrice:number;
  total:number;
}  

export default function CartDetail({productsPrice, total}: CartDetailProps) {
  return (
    <div className="w-[90%] flex flex-col justify-center items-center py-2 ">
      <div className="w-full flex flex-col justify-between items-center p-2 border-t-1 border-[#313030]"> 
        <div className="w-full flex justify-between items-center my-2">
          <p>Productos</p>
          <p>$ {productsPrice} </p>
        </div>
        <div className="w-full flex justify-between items-center mb-3">
          <p>Otro gasto</p>
          <p>$ xxxxx </p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center mt-4 border-t-1 border-[#313030] p-2 pt-4">
        <p>Total</p>
        <p>$ {total} </p>
      </div>
      <div className="w-full flex justify-center items-center mt-4">
        <button className="w-full px-4 py-2 bg-[#525126] text-white rounded-lg border-1 border-[black] hover:bg-[#525126]/80 hover:cursor-pointer ">
          Continuar compra
        </button>
      </div>
    </div>
  );
}