import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Project, ProjectCategory } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

function loadProjects(): Project[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"));

  const list = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    return JSON.parse(raw) as Project;
  });

  return list.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.title.fr.localeCompare(b.title.fr);
  });
}

let cache: Project[] | null = null;

function getProjects(): Project[] {
  if (!cache) cache = loadProjects();
  return cache;
}

export function getAllProjects(): Project[] {
  return getProjects();
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured && !p.isPlaceholder);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getProjects().filter((p) => p.category === category);
}

export function getAllStackTags(): string[] {
  const tags = new Set<string>();
  for (const p of getProjects()) {
    for (const t of p.stack) tags.add(t);
  }
  return Array.from(tags).sort();
}
