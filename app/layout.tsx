import BackToTopButton from "@/components/BackToTopButton/BackToTopButton";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Preloader from "@/components/Preloader/Preloader";
import CustomScrollbar from "@/components/UI/CustomScrollbar";
import Script from "next/script";

const plusJakartaSans = localFont({
  src: [
    {
      path: "../public/fonts/PlusJakartaSans-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-plusJakartaSans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JES Engineering Solutions",
  description: "Scale your business with JES Inc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link
          rel="icon"
          href="/img/logos/jes_emblem.svg"
          type="image/svg+xml"
        />

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T396FSB7');
          `}
        </Script>

        {/* JSON-LD SCHEMA (Organization) */}
        <Script id="organization-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JES",
              "alternateName": "JES Engineering",
              "description": "JES provides comprehensive engineering services including Quantity Take-Off, BIM Modeling, MEP Drafting, Equipment Selection, and Revit Modeling with specialized expertise across all LOD levels.",
              "url": "https://jerseyeng.com/",
              "logo": "https://jerseyeng.com//images/logo.png",
              "foundingDate": "2015",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Bruce Devey"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "U.S. SALES OFFICE",
                "addressLocality": "Charlottesville",
                "addressRegion": "VA",
                "postalCode": "22902",
                "addressCountry": "US"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-534-238-8403",
                  "contactType": "customer service",
                  "email": "texce.derey@jerseyeng.com",
                  "areaServed": "US",
                  "availableLanguage": "English"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+1-532-218-8403",
                  "contactType": "technical support",
                  "email": "bruce.doveyglenoyenq.com",
                  "areaServed": "US"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/jes-engineering",
                "https://twitter.com/jes_engineering"
              ],
              "knowsAbout": [
                "Quantity Take-Off",
                "BIM Modeling",
                "Revit Models",
                "MEP Drafting",
                "Equipment Selection",
                "AutoCAD",
                "XR Visualization",
                "LOD Standards",
                "Component Modeling",
                "Assembly Modeling",
                "HVAC Systems",
                "Electrical Planning",
                "Plumbing Schematics"
              ],
              "makesOffer": [
                {
                  "@type": "Offer",
                  "name": "Quantity Take-Off Services",
                  "description": "Specialized quantity take-off using manufacturing software with 10+ years experience"
                },
                {
                  "@type": "Offer",
                  "name": "BIM Modeling Services",
                  "description": "Comprehensive BIM modeling across LOD 100-400 for conceptual design to fabrication"
                },
                {
                  "@type": "Offer",
                  "name": "MEP Drafting Services",
                  "description": "AutoCAD drafting for mechanical, electrical, and plumbing systems"
                },
                {
                  "@type": "Offer",
                  "name": "Equipment Selection",
                  "description": "Factory-trained equipment selection optimizing performance and cost"
                },
                {
                  "@type": "Offer",
                  "name": "Revit Modeling",
                  "description": "Component and assembly modeling with multi-manufacturer integration"
                }
              ],
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 38.0293,
                  "longitude": -78.4767
                },
                "geoRadius": "500000"
              },
              "areaServed": [
                { "@type": "State", "name": "Virginia" },
                { "@type": "Country", "name": "United States" }
              ],
              "employees": {
                "@type": "Person",
                "name": "Engineering Team",
                "description": "Factory-trained professionals with 10+ years experience in engineering and modeling"
              },
              "keywords": [
                "BIM Modeling",
                "Quantity Take-Off",
                "MEP Drafting",
                "Revit Models",
                "Equipment Selection",
                "Engineering Services",
                "AutoCAD",
                "3D Modeling",
                "XR Visualization",
                "Construction Documentation"
              ],
              "additionalProperty": [
                { "@type": "PropertyValue", "name": "Years of Experience", "value": "10+ years" },
                { "@type": "PropertyValue", "name": "Service Turnaround", "value": "12-72 hours for most scopes" },
                { "@type": "PropertyValue", "name": "Project Management Portal", "value": "JESI Customer Portal" },
                { "@type": "PropertyValue", "name": "Case Study Success", "value": "$400,000 project win in NYC with 48-hour delivery" }
              ]
            }
          `}
        </Script>
        {/* END JSON-LD SCHEMA */}
      </head>

      <body className={plusJakartaSans.variable}>
        {/* GTM NoScript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T396FSB7"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {/* End GTM NoScript */}

        <Header />
        <CustomScrollbar />
        <BackToTopButton />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
