export default function SEOProducts() {
  const pageUrl = "https://mammasoul.com/productos";
  const imageUrl = "https://mammasoul.com/bannerShare.png";

  const webPageSchema = {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": "Catálogo de Productos | Mammasoul",
    "description": "Descubrí el catálogo de productos de diseño sustentable de Mammasoul. Hechos con materiales reciclados y una mirada consciente del consumo.",
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Mammasoul",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mammasoul.com/logoMenu2-whitoutFondo.png"
      }
    }
  };

  return (
    <>
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
      <link rel="canonical" href={pageUrl} />

      {/* 📱 Open Graph */}
      <meta property="og:title" content="Productos sustentables | Mammasoul" />
      <meta
        property="og:description"
        content="Catálogo de productos hechos con materiales reciclados y diseño sustentable."
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mammasoul" />

      {/* 🐦 Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Productos sustentables | Mammasoul" />
      <meta
        name="twitter:description"
        content="Descubrí los productos de diseño sustentable hechos con propósito por Mammasoul."
      />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* ✨ JSON-LD Schema Markup (WebPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
