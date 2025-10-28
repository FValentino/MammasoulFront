export default function SEOHome() {
  const pageUrl = "https://mammasoul.com/"; // URL base de la página de inicio
  const imageUrl = "https://mammasoul.com/bannerShare.png"; // Imagen principal para compartir

  // Schema Markup para la página principal (tipo WebSite y Organization)
  const homeSchema = {
    "@context": "https://schema.org/",
    "@graph": [
      {
        // Se mantiene WebSite, pero sin el bloque SearchAction
        "@type": "WebSite",
        "name": "Mammasoul | Diseño Sustentable y Moda Consciente",
        "url": pageUrl,
      },
      {
        "@type": "Organization",
        "name": "Mammasoul",
        "url": pageUrl,
        "logo": {
          "@type": "ImageObject",
          "url": "https://mammasoul.com/logo.png" // URL del logo
        },
        "sameAs": [
          // Agrega aquí los enlaces a tus redes sociales
          "https://www.instagram.com/mammasoul", 
          "https://www.facebook.com/mammasoul"
        ]
      }
    ]
  };

  return (
    <>
      {/* 🌐 SEO General */}
      <title>Mammasoul | Diseño Sustentable y Moda Consciente</title>
      <meta
        name="description"
        content="Mammasoul: Diseño sustentable hecho con propósito. Explorá nuestra colección de accesorios y moda ética, creados a partir de materiales reciclados. Uníndote al consumo consciente."
      />
      <meta
        name="keywords"
        content="mammasoul, moda sustentable, diseño sustentable, home, accesorios, carteras, reciclado, consumo consciente, moda ética"
      />
      <link rel="canonical" href={pageUrl} />

      {/* 📱 Open Graph */}
      <meta property="og:title" content="Mammasoul | Diseño Sustentable y Moda Consciente" />
      <meta
        property="og:description"
        content="Diseño sustentable hecho con propósito por Mammasoul. Moda ética, accesorios reciclados."
      />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mammasoul" />

      {/* 🐦 Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mammasoul | Diseño Sustentable" />
      <meta
        name="twitter:description"
        content="Explorá la moda consciente y accesorios hechos con materiales reciclados de Mammasoul."
      />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* ✨ JSON-LD Schema Markup (WebSite & Organization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
    </>
  );
}
