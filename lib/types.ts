export type Locale = "fr" | "en";

export type LocalizedText = {
  fr: string;
  en: string;
};

export type ProjectCategory =
  | "rag-agents"
  | "ml-deep-learning"
  | "automation-rpa"
  | "data-engineering-api"
  | "voice-audio";

export type ProjectMetric = {
  label: string;
  value: string;
  icon?: string;
  /** One-sentence business/functional impact explaining why this metric matters. */
  impact?: LocalizedText;
  /** True when the value is a reasoned estimate rather than a directly measured figure. */
  estimated?: boolean;
};

/** Mermaid flowchart definition (`graph TD` / `graph LR` syntax), one per locale. */
export type ArchitectureDiagram = LocalizedText;

export type Project = {
  slug: string;
  title: LocalizedText;
  category: ProjectCategory;
  coverImage: string;
  gallery: string[];
  summary: LocalizedText;
  context: LocalizedText;
  approach: LocalizedText;
  architecture: LocalizedText;
  architectureDiagram?: ArchitectureDiagram;
  stack: string[];
  metrics: ProjectMetric[];
  results: LocalizedText;
  challenges: LocalizedText;
  timeline?: string;
  links?: {
    github?: string;
    demo?: string;
    caseStudyPdf?: string;
  };
  featured: boolean;
  isPlaceholder?: boolean;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "rag-agents",
  "ml-deep-learning",
  "automation-rpa",
  "data-engineering-api",
  "voice-audio",
];
