export default function JsonLd() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "PlumbingBusiness",
    "name": "SARL RUBIO",
    "image": "https://sarl-rubio.fr/images/source/logo.jpg",
    "@id": "https://sarl-rubio.fr",
    "url": "https://sarl-rubio.fr",
    "telephone": "+33490882477",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1593 Route d'Avignon",
      "addressLocality": "Entraigues-sur-la-Sorgue",
      "postalCode": "84320",
      "addressRegion": "Vaucluse",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.0041,
      "longitude": 4.9272
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [],
    "priceRange": "$$",
    "areaServed": [
      {
        "@type": "City",
        "name": "Entraigues-sur-la-Sorgue"
      },
      {
        "@type": "City",
        "name": "Avignon"
      },
      {
        "@type": "City",
        "name": "Carpentras"
      },
      {
        "@type": "City",
        "name": "Le Pontet"
      },
      {
        "@type": "City",
        "name": "Vedène"
      },
      {
        "@type": "City",
        "name": "Sorgues"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Plomberie et Chauffage",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation de Climatisation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dépannage Plomberie"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Installation de Pompe à Chaleur"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  );
}
