import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
}

export default function SEO({
  title = "Mammasoul | Diseño sustentable hecho con propósito",
  description = "Mammasoul crea productos de diseño sustentable con materiales reciclados y una mirada consciente del consumo.",
  image = "https://mammasoul.com/bannerShare.png",
  url = "https://mammasoul.com",
  type = "website",
}: SEOProps) {
  return (
    <Helmet>
      {/* 🌐 SEO básico */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* 🧠 Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Mammasoul" />
      <meta property="og:locale" content="es_AR" />

      {/* 🐦 Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@mammasoul.argentina" />

      {/* 🧩 Datos estructurados básicos (Schema.org) */}
      <script type="application/ld+json">{`
      {
        "@context": "https://schema.org",
        "@type": "${type === "product" ? "Product" : "Organization"}",
        "name": "Mammasoul",
        "url": "${url}",
        "description": "${description}",
        "image": "${image}",
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
      }
      `}</script>
    </Helmet>
  );
}
