import type { Product } from '../../types';

interface SEOProductDetailProps {
  product: Product;
  currencyCode?: string; 
}

export default function SEOProductDetail({ product, currencyCode = 'ARS' }: SEOProductDetailProps) {
  if (!product || !product.id) return null;

  // 1. Lógica para encontrar la imagen representativa
  const representativeImage = product.images?.find(img => img.isRepresentative);

  // 2. Definición de imageUrl: Usa la representativa, si no existe, usa la primera, 
  //    si no existe ninguna, usa el fallback.
  const imageUrl = representativeImage?.url 
    ? representativeImage.url 
    : (product.images?.[0]?.url || "https://mammasoul.com/bannerShare.png");

  const pageUrl = `https://mammasoul.com/productos/${product.id}`;
  const availability = product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock";
  const availabilityOg = product.stock > 0 ? "in stock" : "out of stock";
  
  const safeDescription = product.description && product.description.length > 50 
    ? product.description 
    : `${product.name} | Producto de diseño sustentable y moda consciente, hecho con materiales reciclados por Mammasoul.`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": imageUrl, // Utiliza la URL de la imagen representativa
    "description": safeDescription,
    "offers": {
      "@type": "Offer",
      "priceCurrency": currencyCode,
      "price": String(product.price),
      "itemCondition": "https://schema.org/NewCondition",
      "availability": availability,
      "url": pageUrl
    }
  };

  return (
    <>
      <title>{`${product.name} | Mammasoul | Moda Sustentable`}</title>
      <meta
        name="description"
        content={safeDescription}
      />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:title" content={`${product.name} | Mammasoul`} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="Mammasoul" />
      
      <meta property="product:price:amount" content={String(product.price)} />
      <meta property="product:price:currency" content={currencyCode} />
      <meta property="product:availability" content={availabilityOg} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${product.name} | Mammasoul`} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={imageUrl} />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}
