export default function SEOContact() {
  const pageUrl = "https://mammasoul.com/contacto"; 

  // Schema Markup para la página de Contacto
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": "Contacto | Mammasoul",
        "description": "Ponte en contacto con Mammasoul para consultas sobre pedidos, diseño sustentable, colaboraciones o cualquier otra duda.",
        "url": pageUrl
      },
      {
        "@type": "Organization",
        "name": "Mammasoul",
        "url": "https://mammasoul.com/",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+54-362-5144315", 
          "contactType": "Ventas y Soporte",
          "email": "mammasoul.store@gmail.com", 
          "areaServed": "AR", 
          "availableLanguage": "es"
        }
      }
      /* // Si tienes una dirección física, descomenta y completa el siguiente bloque
      {
        "@type": "LocalBusiness",
        "name": "Mammasoul Sede Principal",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. Corrientes 1234",
          "addressLocality": "Buenos Aires",
          "addressRegion": "CABA",
          "postalCode": "C1043",
          "addressCountry": "AR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-34.6037", // Reemplaza con coordenadas reales
          "longitude": "-58.3816"
        },
        "url": pageUrl,
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ]
      }
      */
    ]
  };

  return (
    <>
      {/* 🌐 SEO General */}
      <title>Contacto y Soporte | Mammasoul</title>
      <meta
        name="description"
        content="Ponte en contacto con Mammasoul para cualquier duda, consulta sobre productos sustentables o colaboraciones. Te responderemos a la brevedad."
      />
      <link rel="canonical" href={pageUrl} />

      {/* 📱 Open Graph */}
      <meta property="og:title" content="Contacto | Mammasoul" />
      <meta
        property="og:description"
        content="Contáctanos para información sobre diseño sustentable y moda ética."
      />
      <meta property="og:image" content="https://mammasoul.com/bannerShare.png" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Mammasoul" />

      {/* 🐦 Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Contacto | Mammasoul" />
      <meta
        name="twitter:description"
        content="Consultas y soporte sobre nuestros productos sustentables."
      />
      <meta name="twitter:image" content="https://mammasoul.com/bannerShare.png" />
      
      {/* ✨ JSON-LD Schema Markup (ContactPage & Organization) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
    </>
  );
}
