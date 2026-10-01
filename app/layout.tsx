import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dedeepya-majety.github.io"),
  title: {
    default:
      "Dedeepya Majety - Azure Data Engineer | Databricks & PySpark Platform Specialist",
    template: "%s - Dedeepya Majety",
  },
  description:
    "Azure Data Engineer with 3+ years at Cognizant architecting enterprise Lakehouse platforms, PySpark pipelines, Delta Lake medallion architectures, and automated orchestration via ADF and Airflow. Databricks & Power BI Certified.",
  keywords: [
    "Dedeepya Majety",
    "Majety Dedeepya",
    "Azure Data Engineer",
    "Databricks Certified Associate Developer",
    "Apache Spark 3.0",
    "PySpark",
    "Delta Lake",
    "Medallion Architecture",
    "Azure Data Factory",
    "Apache Airflow",
    "Unity Catalog",
    "ADLS Gen2",
    "Informatica PowerCenter Migration",
    "Informatica MDM",
    "Cognizant",
    "Saveetha Engineering College",
  ],
  authors: [
    {
      name: "Dedeepya Majety",
      url: "https://dedeepya-majety.github.io",
    },
  ],
  creator: "Dedeepya Majety",
  publisher: "Dedeepya Majety",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://dedeepya-majety.github.io",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dedeepya-majety.github.io",
    siteName: "Dedeepya Majety - Portfolio",
    title:
      "Dedeepya Majety - Azure Data Engineer | Databricks & PySpark Platform Specialist",
    description:
      "Azure Data Engineer with 3+ years at Cognizant architecting enterprise Lakehouse platforms, PySpark pipelines, Delta Lake medallion architectures, and automated orchestration via ADF and Airflow.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dedeepya Majety - Azure Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dedeepya Majety - Azure Data Engineer | Databricks & PySpark Platform Specialist",
    description:
      "Azure Data Engineer with 3+ years at Cognizant. Databricks & Power BI Certified.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${lato.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0284C7" />
        <meta name="author" content="Dedeepya Majety" />
        <link rel="canonical" href="https://dedeepya-majety.github.io" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        {/* Schema.org Person metadata */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Dedeepya Majety",
              alternateName: ["Majety Dedeepya", "dedeepya-majety"],
              url: "https://dedeepya-majety.github.io",
              image: "https://dedeepya-majety.github.io/img/avatar.jpg",
              email: "mailto:majetydedeepya0@gmail.com",
              jobTitle: "Azure Data Engineer",
              description:
                "Azure Data Engineer with 3+ years at Cognizant architecting enterprise Lakehouse platforms, PySpark pipelines, Delta Lake medallion architectures, and automated orchestration via ADF and Airflow.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "India",
              },
              knowsLanguage: ["English", "Telugu", "Tamil"],
              knowsAbout: [
                "Azure Databricks",
                "Apache Spark",
                "PySpark",
                "Delta Lake",
                "Medallion Architecture",
                "Azure Data Factory (ADF)",
                "Apache Airflow",
                "Unity Catalog",
                "ADLS Gen2",
                "Informatica PowerCenter",
                "Informatica MDM",
                "Power BI & DAX",
              ],
              sameAs: [
                "https://www.linkedin.com/in/majetydedeepya-data-engineer",
                "https://github.com/dedeepya-majety",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Cognizant Technology Solutions",
              },
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Saveetha Engineering College",
                  department: "Electronics and Communication Engineering",
                },
              ],
              award: [
                "Databricks Certified Associate Developer for Apache Spark 3.0",
                "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
                "Cognizant Delivery Excellence Award (Lakehouse Migration)",
              ],
              workExperience: [
                {
                  "@type": "Organization",
                  name: "Cognizant Technology Solutions",
                  description:
                    "Associate - Data Engineer (Informatica to Azure Databricks Lakehouse Migration, PySpark & Delta Lake)",
                },
              ],
            }),
          }}
        />
        {/* Schema.org WebSite metadata */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dedeepya Majety",
              url: "https://dedeepya-majety.github.io",
              description:
                "Portfolio of Dedeepya Majety - Azure Data Engineer specializing in Azure Databricks, PySpark, and Delta Lake Medallion Architecture.",
              author: {
                "@type": "Person",
                name: "Dedeepya Majety",
                url: "https://dedeepya-majety.github.io",
              },
            }),
          }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-lato), sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
