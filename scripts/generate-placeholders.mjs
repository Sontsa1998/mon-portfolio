import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "images", "projects");

const GRADIENTS = [
  ["#6366f1", "#8b5cf6"],
  ["#8b5cf6", "#22d3ee"],
  ["#22d3ee", "#6366f1"],
  ["#4f46e5", "#a855f7"],
];

function coverSvg(label, seed) {
  const [c1, c2] = GRADIENTS[seed % GRADIENTS.length];
  const gridId = `grid${seed}`;
  const gradId = `grad${seed}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <pattern id="${gridId}" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="#0a0a0f"/>
  <rect width="1200" height="675" fill="url(#${gradId})" opacity="0.22"/>
  <rect width="1200" height="675" fill="url(#${gridId})"/>
  <circle cx="1000" cy="120" r="260" fill="url(#${gradId})" opacity="0.35"/>
  <text x="60" y="600" font-family="Arial, sans-serif" font-size="40" font-weight="700" fill="#f5f5f7">${label}</text>
</svg>`;
}

function diagramSvg(label, seed) {
  const [c1, c2] = GRADIENTS[seed % GRADIENTS.length];
  const gradId = `dgrad${seed}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="#0d0d14"/>
  <g stroke="url(#${gradId})" stroke-width="2" fill="none" opacity="0.8">
    <rect x="80" y="280" width="220" height="110" rx="14"/>
    <rect x="490" y="280" width="220" height="110" rx="14"/>
    <rect x="900" y="280" width="220" height="110" rx="14"/>
    <path d="M300 335 H490" marker-end="url(#arrow)"/>
    <path d="M710 335 H900" marker-end="url(#arrow)"/>
  </g>
  <g fill="#f5f5f7" font-family="Arial, sans-serif" font-size="24" font-weight="600" text-anchor="middle">
    <text x="190" y="345">Input</text>
    <text x="600" y="345">Process</text>
    <text x="1010" y="345">Output</text>
  </g>
  <text x="60" y="80" font-family="Arial, sans-serif" font-size="32" font-weight="700" fill="#f5f5f7">${label}</text>
</svg>`;
}

const covers = [
  ["churn-deep-learning", "Deep Learning Churn"],
  ["churn-xgboost-v1", "XGBoost Churn V1"],
  ["assistant-o2s", "Assistant O2S RAG"],
  ["rag-correctif-hybride", "RAG Correctif Hybride"],
  ["framework-migration-hexagonal", "Architecture Hexagonale"],
  ["etl-bot-rpa", "ETL-Bot RPA"],
  ["placeholder", "A completer"],
  ["o2s-churn-data-pipeline", "Data Pipeline O2S"],
  ["kiss-my-agent-v3", "Kiss My Agent V3"],
  ["api-gateway-services-ia", "API Gateway IA"],
  ["assistant-o2s-speech-to-text", "Speech-to-Text"],
  ["assistant-o2s-text-to-speech", "Text-to-Speech"],
];

covers.forEach(([slug, label], i) => {
  const dir = path.join(ROOT, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "cover.svg"), coverSvg(label, i));
});

const diagrams = [
  ["churn-deep-learning", "architecture", "MLP Pipeline"],
  ["churn-deep-learning", "metrics", "ROC / PR-AUC"],
  ["assistant-o2s", "pipeline", "Agent Pipeline"],
  ["rag-correctif-hybride", "graph", "State Graph"],
  ["framework-migration-hexagonal", "ports-adapters", "Ports & Adapters"],
];

diagrams.forEach(([slug, name, label], i) => {
  const dir = path.join(ROOT, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, `${name}.svg`), diagramSvg(label, i));
});

console.log("Placeholder images generated.");
