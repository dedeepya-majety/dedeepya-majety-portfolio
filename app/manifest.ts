import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sai Yasaswini Majety — Senior Backend & Cloud Infrastructure Engineer",
    short_name: "Yasaswini Majety",
    description:
      "Senior Backend & Cloud Infrastructure Engineer with 6+ years shipping high-availability distributed systems, in-flight fleet telemetry engines, and enterprise developer platforms. Ex-Viasat.",
    start_url: "/",
    display: "standalone",
    background_color: "#091227",
    theme_color: "#18BC9C",
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
    categories: ["technology", "engineering", "cloud", "portfolio"],
    lang: "en",
    dir: "ltr",
  };
}
