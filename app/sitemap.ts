import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/carta", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/monta-tu-taco", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/valencia", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/legal/privacidad", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/legal/cookies", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/legal/alergenos", priority: 0.4, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
