import { Helmet } from "react-helmet-async";

export default function SEOProducts() {
  return (
    <Helmet>
      {/* 🌐 SEO General */}
      <title>Productos sustentables | Mammasoul</title>
      <meta
        name="description"
        content="Descubrí el catálogo de productos de diseño sustentable de Mammasoul. Hechos con materiales reciclados y una mirada consciente del consumo."
      />
      <meta
        name="keywords"
        content="mammasoul, productos sustentables, diseño sustentable, reciclado, consumo consciente, accesorios eco, moda ética, tienda verde"
      />
      <link rel="canonical" href="https://mammasoul.com/productos" />

      {/* 📱 Open Graph */}
      <meta property="og:title" content="Productos sustentables | Mammasoul" />
      <meta
        property="og:description"
        content="Catálogo de productos hechos con materiales reciclados y diseño sustentable."
      />
      <meta property="og:image" content="https://mammasoul.com/bannerShare.png" />
      <meta property="og:url" content="https://mammasoul.com/productos" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mammasoul" />

      {/* 🐦 Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Productos sustentables | Mammasoul" />
      <meta
        name="twitter:description"
        content="Descubrí los productos de diseño sustentable hechos con propósito por Mammasoul."
      />
      <meta name="twitter:image" content="https://mammasoul.com/bannerShare.png" />
    </Helmet>
  );
}
