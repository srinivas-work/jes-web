import { serviceSectionsObj } from "@/utils/data/dummyData";
import { ServiceId } from "@/utils/types";
import Script from "next/script";
import ServiceItem from "./ServiceItem"; // your client component

export default function ServicePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JES",
    description:
      "Provider of specialized Quantity Take-Off (QTO), BIM/Revit Modeling, and engineering support services.",
    url: "https://jerseyeng.com/quantity-take-off",
    telephone: "+1-634-218-8403",
    email: "kance.drevoglerroyen@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "U.S. SALES OFFICE",
      addressLocality: "Charlottesville",
      addressRegion: "Virginia",
      postalCode: "22902",
      addressCountry: "United States",
    },
    areaServed: "United States",
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 38.0293,
        longitude: -78.4767,
      },
      geoRadius: "500000",
    },
    services: [
      "Specialized Quantity Take-Off",
      "BIM/Revit Modeling",
      "XR Visualization",
      "Equipment Selection",
      "Specification Review",
      "Project Management Portal",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Quantity Take-Off Service",
        description:
          "Specialized Quantity Take-Off using manufacturing software with 10+ years QTO experience.",
      },
      {
        "@type": "Offer",
        name: "BIM/Revit Modeling",
        description: "BMV/Revit Modelling + XR Visualization services",
      },
      {
        "@type": "Offer",
        name: "Equipment Selection Support",
        description: "Assistance with Equipment or Product Selection",
      },
    ],
    knowsAbout: [
      "Quantity Take-Off",
      "BIM Modeling",
      "Revit Models",
      "Equipment Selection",
      "Construction Estimation",
      "Project Management",
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://jerseyeng.com/services",
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script id="service-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>

      {/* Actual Page Component */}
      <ServiceItem id={id as ServiceId} />
    </>
  );
}
