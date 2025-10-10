import { Helmet } from "react-helmet-async";
import type { Product } from "../../types/product";

interface SEOProductDetailProps {
  product: Product;
}

export default function SEOProductDetail({ product }: SEOProductDetailProps) {
  if (!product) return null;

  const pageUrl = `https://mammasoul.com/producto/${product.id}`;
  const imageUrl = product.images?.[0] ? product.images[0].url : "https://mammasoul.com/bannerShare.png";

  return (
    <Helmet>
      {/* 🌐 SEO General */}
      <title>{`${product.name} | Mammasoul`}</title>
      <meta
        name="description"
        content={product.description || "Producto de diseño sustentable hecho con materiales reciclados por Mammasoul."}
      />
      <link rel="canonical" href={pageUrl} />

      {/* 📱 Open Graph */}
      <meta property="og:title" content={`${product.name} | Mammasoul`} />
      <meta
        property="og:description"
        content={product.description || "Diseño sustentable hecho con propósito por Mammasoul."}
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="product" />
      <meta property="product:price:amount" content={String(product.price)} />
      <meta property="product:availability" content={product.stock > 0 ? "in stock" : "out of stock"} />
      <meta property="og:site_name" content="Mammasoul" />

      {/* 🐦 Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${product.name} | Mammasoul`} />
      <meta
        name="twitter:description"
        content={product.description || "Producto sustentable hecho con materiales reciclados por Mammasoul."}
      />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
