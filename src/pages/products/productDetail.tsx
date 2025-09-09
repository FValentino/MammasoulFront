import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Product } from '../../types/product';
import {BackButton} from '../../components/common/ui';
import { getProductById } from '../../services/productService';
import { useCart } from '../../context/cartContext';

export default function ProductDetail(){
  const params = useParams();
  const [product, setProduct] = useState<Product|null>(null);
  const { addToCart } = useCart();

  const productId = Number(params.id)

  useEffect(()=>{
    setProduct(getProductById(productId))
  },[productId])

  return(
    <section className="container mx-auto">
      <div className='w-[90%] mx-auto my-4 m'>
        <BackButton/>
      </div>
      {
        product
        ? 
          <div className='w-[90%] flex flex-col rounded-lg mx-auto md:flex-row md:items-center'>
            <div className="w-full p-2">
              <img src={product.image} alt={product.name} className='w-[70%] mx-auto border rounded-lg' />
            </div>
            <div className='w-full mt-3 '>
              <div className='w-[90%] mx-auto'>
                <h2 className='text-2xl text-center'> {product.name} </h2>
                <p className='text-lg mt-1 text-center'> DESCRIPCION DE PRODUCTO </p>
              </div>
              <div className='h-[0.5px] border-1 my-3'></div>
              <div className='w-full flex justify-around my-2'>
                <p className='text-xl font-bold'> $ {product.price} </p>
                <p className='text-xl'> disponibles: {product.stock} </p>
              </div>
              <div className='w-full mt-4 flex justify-center items-center '>
                <button onClick={()=>{ addToCart( {...product, quantity: 1} ) }}
                className="w-2/3 mx-auto bg-[#525126] text-white font-bold py-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div> 
        :
          <p>Producto no encontrado</p> 
      }
    </section>
  );
}