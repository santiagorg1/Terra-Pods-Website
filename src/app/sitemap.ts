import type { MetadataRoute } from "next";
import { models } from "@/lib/data";

const SITE_URL = "https://terrapods.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/models", "/financing", "/gallery", "/contact"];
  const lastModified = new Date();
  const baseEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
  const modelEntries: MetadataRoute.Sitemap = models.map((m) => ({
    url: `${SITE_URL}/models/${m.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...baseEntries, ...modelEntries];
}
