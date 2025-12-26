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

  // ✅ Google Search Console Verification
  verification: {
    google: "e6LCO6c1jUvL2qOgf3XtHF43bFFVufmiEd2-INLv1PQ",
  },
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
              "logo": "https://jerseyeng.com/images/logo.png",
              "foundingDate": "2015",
              "founders": [{ "@type": "Person", "name": "Bruce Devey" }],
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
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/jes-engineering",
                "https://twitter.com/jes_engineering"
              ]
            }
          `}
        </Script>
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

        <Preloader />
        <Header />
        <CustomScrollbar />
        <BackToTopButton />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
