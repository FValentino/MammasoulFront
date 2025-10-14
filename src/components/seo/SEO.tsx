// ===============================================
// 1. INTERFACES DE TIPADO (Definidas por el usuario)
// ===============================================

// Interfaz de Imagen (si la tienes definida)
interface ProductImage {
    url: string;
    // ... otros campos
}

// Interfaz de Producto (Tu tipo completo)
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    isActive: boolean;
    inSale: boolean;
    isFeature: boolean;
    images?: ProductImage[]; 
    // Campos opcionales para SEO que mejoran el Rich Snippet
    ratingValue?: number; 
    reviewCount?: number; 
}

// Propiedades BASE que son requeridas para generar la metadata
interface BaseSEOProps {
    title: string;
    description: string;
    image: string;
    url: string;
    type: "website" | "product";
}

// Interfaz principal del componente (acepta todo como OPCIONAL)
interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: "website" | "product";
    product?: Product; // Objeto Producto completo
    currency?: string; // Necesario para el Schema de Oferta (ej: "ARS")
}

// ===============================================
// 2. FUNCIONES AUXILIARES PARA SCHEMA.ORG
// ===============================================

// --- SCHEMA DE PRODUCTO ---
const buildProductSchema = (props: BaseSEOProps & { product: Product, currency: string }) => {
    
    // Determinar la disponibilidad a partir del stock
    const availability = props.product.stock > 0 ? 'InStock' : 'OutOfStock';
    
    // Usamos el campo opcional 'images' si existe, si no, usamos la imagen base
    const imageUrl = props.product.images?.[0]?.url || props.image;
    
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": props.product.name,
        "url": props.url,
        "description": props.product.description,
        "image": imageUrl,
        "sku": props.product.id.toString(), // Usamos el ID como SKU
        
        "offers": {
            "@type": "Offer",
            "url": props.url,
            "priceCurrency": props.currency,
            "price": props.product.price,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": `https://schema.org/${availability}`
        },
        // Bloque opcional de Rating y Reviews
        ...(props.product.reviewCount && props.product.reviewCount > 0 && {
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": props.product.ratingValue || 5,
                "reviewCount": props.product.reviewCount
            }
        })
    });
}

// --- SCHEMA DE ORGANIZACIÓN ---
const buildOrganizationSchema = (props: BaseSEOProps) => {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mammasoul",
        "url": "https://mammasoul.com",
        "description": props.description,
        "image": "https://mammasoul.com/bannerShare.png",
        "logo": "https://mammasoul.com/bannerShare.png",
        "email": "mammasoul@gmail.com",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+5493625144315",
            "contactType": "customer service",
            "areaServed": "AR",
            "availableLanguage": "es"
        },
        "sameAs": [
            "https://www.instagram.com/mammasoul.argentina",
            "https://www.tiktok.com/@mammasoul.argentina",
            "https://wa.me/5493625144315"
        ]
    });
}

// ===============================================
// 3. COMPONENTE PRINCIPAL (SEO.tsx)
// ===============================================

export default function SEO({
    title = "Mammasoul | Diseño sustentable hecho con propósito",
    description = "Mammasoul crea productos de diseño sustentable con materiales reciclados y una mirada consciente del consumo.",
    image = "https://mammasoul.com/bannerShare.png",
    url = "https://mammasoul.com",
    type = "website",
    product,
    currency = "ARS", // Moneda por defecto
}: SEOProps) {

    // 1. Creamos el objeto con las propiedades BASE y resolvemos la imagen/URL
    const baseProps: BaseSEOProps = { 
        title, 
        description, 
        // Si hay producto y tiene imágenes, usa la primera, sino usa la imagen genérica
        image: product?.images?.[0]?.url || image, 
        url, 
        type 
    };

    // 2. Decide qué Schema usar, pasando el objeto Product si aplica
    const currentSchema = 
        type === "product" && product
            ? buildProductSchema({ ...baseProps, product, currency }) 
            : buildOrganizationSchema(baseProps);
            
    // Ajuste de Type para Open Graph (og:type)
    const ogType = type === "product" ? "product" : "website";

    return (
        <>
            {/* 🌐 SEO básico */}
            <title>{baseProps.title}</title>
            <meta name="description" content={baseProps.description} />
            <link rel="canonical" href={baseProps.url} />
            <meta name="robots" content="index, follow" />

            {/* 🧠 Open Graph */}
            <meta property="og:type" content={ogType} /> 
            <meta property="og:title" content={baseProps.title} />
            <meta property="og:description" content={baseProps.description} />
            <meta property="og:image" content={baseProps.image} />
            <meta property="og:url" content={baseProps.url} />
            <meta property="og:site_name" content="Mammasoul" />
            <meta property="og:locale" content="es_AR" />

            {/* 🐦 Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={baseProps.title} />
            <meta name="twitter:description" content={baseProps.description} />
            <meta name="twitter:image" content={baseProps.image} />
            <meta name="twitter:site" content="@mammasoul.argentina" />

            {/* 🧩 DATOS ESTRUCTURADOS (Schema.org) */}
            <script type="application/ld+json">
                {currentSchema}
            </script>
        </>
    );
}