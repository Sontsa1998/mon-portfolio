import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjects } from "@/lib/projects";

const BASE_URL = "https://christian-sontsa-kiteu.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/projects", "/about", "/contact"];
  const projects = getAllProjects();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({
        url: `${BASE_URL}/${locale}${p}`,
        lastModified: new Date(),
        changeFrequency: p === "" ? "weekly" : "monthly",
        priority: p === "" ? 1 : 0.7,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
