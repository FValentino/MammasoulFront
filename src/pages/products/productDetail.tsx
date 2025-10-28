import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/common/ui';
import { useCart } from '../../context';
import { useProductName } from '../../hooks';
import ImagesGalery from '../../components/products/imageGalery';
import SEOProductDetail from '../../components/seo/productDetailSeo';

export default function ProductDetail() {
    const params = useParams();
    const { addToCart } = useCart();
    const productName = params.name? params.name.replaceAll("-", " ") : "";
    
    const { data: product, isPending } = useProductName(productName); 

    return (
        <section className="container mx-auto">
            
            {product && (
                <SEOProductDetail product={product} />
            )}
            
            <div className='w-[90%] mx-auto my-4 m'>
                <BackButton />
            </div>
            
            {
                isPending
                ?
                    <div className="w-full h-auto">
                        <div className="w-[50%] mx-auto flex justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-1 border-t-2 border-b-2 border-gray-500"></div>
                        </div>
                    </div>
                :
                    product 
                    ?
                    <>
                        <div className='w-[90%] flex flex-col rounded-lg mx-auto md:flex-row md:items-center'>
                            <div className="w-full p-2">
                                <ImagesGalery images={product.images ? product.images : []} />
                            </div>
                            <div className='w-full mt-3 '>
                                <div className='w-[90%] mx-auto'>
                                    <div className='w-full h-auto flex justify-center items-center md:h-12'>
                                        <h1 className='text-3xl text-center font-bold lowercase first-letter:uppercase'>
                                            {product.name}
                                        </h1>
                                    </div>
                                    <div className='w-full h-auto flex justify-center items-center md:h-24'>
                                        <p className='text-lg mt-1 text-center font-medium'> {product.description} </p>
                                    </div>
                                </div>
                                <div className='h-[0.5px] border-1 my-3'></div>
                                <div className='w-full flex justify-around my-2'>
                                    <p className='text-xl font-bold'> $ {product.price} </p>
                                    <p className='text-xl'> disponibles: {product.stock} </p>
                                </div>
                                <div className='w-full mt-4 flex justify-center items-center '>
                                    <button
                                        onClick={() => { addToCart({ ...product, quantity: 1, subtotal: product.price }) }}
                                        className="w-2/3 mx-auto bg-[#525126] text-white font-bold py-2 rounded hover:bg-[#525126]/90 hover:cursor-pointer transition-colors"
                                    >
                                        Agregar al Carrito
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                    : ""
            }
        </section>
    );
}