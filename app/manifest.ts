import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dedeepya Majety - Azure Data Engineer",
    short_name: "Dedeepya Majety",
    description:
      "Azure Data Engineer with 3+ years at Cognizant architecting enterprise Lakehouse platforms, PySpark pipelines, and Delta Lake medallion architectures. Databricks & Power BI Certified.",
    start_url: "/",
    display: "standalone",
    background_color: "#091227",
    theme_color: "#0284C7",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: [
      "technology",
      "engineering",
      "cloud",
      "data-engineering",
      "portfolio",
    ],
    lang: "en",
    dir: "ltr",
  };
}
