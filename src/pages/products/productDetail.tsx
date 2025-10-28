import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/common/ui';
import { useCart } from '../../context';
import { useProduct } from '../../hooks';
import ImagesGalery from '../../components/products/imageGalery';
import SEO from '../../components/seo/SEO';

export default function ProductDetail() {
    const params = useParams();
    const { addToCart } = useCart();
    const productId = Number(params.id);
    
    // Asumimos que useProduct devuelve { data: Product | null | undefined }
    const { data: product } = useProduct(productId); 

    // --- LÓGICA DE SEO y URL ---
    // 1. Verificar si tenemos datos de producto y obtener la URL completa
    const productUrl = product 
        ? `https://mammasoul.com/productos/${product.id}/${product.name.replace(/ /g, "-").toLowerCase()}` 
        : 'https://mammasoul.com'; // Fallback a la Home si no hay producto

    
    // 3. Determinar la imagen principal (usando la lógica de tu interfaz)
    const primaryImage = product?.images?.[0]?.url || 'https://mammasoul.com/bannerShare.png';
    // ----------------------------

    return (
        <section className="container mx-auto">
            {/* Solo renderizamos el SEO y el contenido si el producto ha cargado.
              (El componente SEO ya maneja sus propios fallbacks a valores por defecto)
            */}
            {product && (
                <SEO
                    title={product.name}
                    description={product.description}
                    url={productUrl}
                    image={primaryImage}
                    type="product"
                    product={product} // <-- ¡Pasamos el objeto 'product' completo!
                    currency="ARS"   // <-- Moneda necesaria para el Schema de Oferta
                />
            )}
            
            <div className='w-[90%] mx-auto my-4 m'>
                <BackButton />
            </div>
            
            {product ? (
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
            ) : (
                // Mensaje de carga o producto no encontrado
                <p className="text-center text-xl my-10">
                    {/* Puedes añadir una lógica de loading aquí */}
                    {product === undefined ? 'Cargando producto...' : 'Producto no encontrado'}
                </p>
            )}
        </section>
    );
}