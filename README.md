# Christian Sontsa Kiteu — Portfolio

Portfolio professionnel "AI Engineer / ML Engineer / Data Engineer", construit avec Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, React Three Fiber et next-intl (FR/EN).

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** + **shadcn/ui** (Radix UI)
- **Framer Motion** + **react-intersection-observer** pour les animations et le scroll-reveal
- **React Three Fiber** + **drei** pour le fond de particules 3D du hero (désactivé sur mobile et si `prefers-reduced-motion`)
- **Recharts** pour les jauges de métriques sur les fiches projet
- **next-intl** pour l'internationalisation FR/EN (`/fr/...`, `/en/...`)
- **React Hook Form** + **Zod** pour le formulaire de contact, avec honeypot anti-spam
- **Resend** (optionnel) pour l'envoi d'email depuis la route API de contact

## Lancer le projet en local

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000) (redirige automatiquement vers `/fr` ou `/en` selon la langue du navigateur).

Autres commandes utiles :

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # ESLint
```

### Variables d'environnement

Le formulaire de contact fonctionne sans configuration (les messages sont journalisés côté serveur en développement). Pour envoyer réellement les emails en production, créez un fichier `.env.local` :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
```

## Ajouter ou modifier un projet

Chaque projet est un fichier JSON dans `content/projects/`, conforme au type `Project` défini dans `lib/types.ts` :

```ts
interface Project {
  slug: string;                 // identifiant unique, utilisé dans l'URL /projects/[slug]
  title: { fr: string; en: string };
  category: "rag-agents" | "ml-deep-learning" | "automation-rpa" | "data-engineering-api" | "voice-audio";
  coverImage: string;            // image 16:9, ex. /images/projects/mon-projet/cover.svg
  gallery: string[];             // captures / diagrammes complémentaires
  summary: { fr: string; en: string };
  context: { fr: string; en: string };
  approach: { fr: string; en: string };
  architecture: { fr: string; en: string };
  stack: string[];
  metrics: { label: string; value: string }[];
  results: { fr: string; en: string };
  challenges: { fr: string; en: string };
  timeline?: string;
  links?: { github?: string; demo?: string; caseStudyPdf?: string };
  featured: boolean;             // affiché en page d'accueil
  isPlaceholder?: boolean;       // affiche le bandeau "à compléter"
}
```

Pour ajouter un projet :

1. Créez `content/projects/mon-projet.json` en suivant la structure ci-dessus.
2. Déposez les images dans `public/images/projects/mon-projet/`.
3. Le projet apparaît automatiquement sur `/projects` et, si `featured: true`, sur la page d'accueil — aucune autre modification n'est nécessaire (`lib/projects.ts` lit tout le dossier `content/projects/` au build).

Les métriques dont la valeur est un ratio (`0.79`) ou un pourcentage (`86%`) sont affichées sous forme de jauge circulaire animée ; les autres valeurs sont affichées en compteur ou en texte brut (voir `components/project/metrics-panel.tsx`).

### Textes d'interface

Les chaînes de l'interface (navigation, boutons, libellés de formulaire, etc.) sont dans `messages/fr.json` et `messages/en.json`. Le contenu détaillé de chaque projet vit dans son propre fichier JSON (voir ci-dessus), pas dans ces fichiers de messages.

## Déployer sur Vercel

1. Poussez le dépôt sur GitHub.
2. Importez-le sur [vercel.com/new](https://vercel.com/new) — Vercel détecte automatiquement Next.js, aucune configuration additionnelle n'est nécessaire.
3. Ajoutez la variable d'environnement `RESEND_API_KEY` dans les réglages du projet Vercel si vous souhaitez que le formulaire de contact envoie de vrais emails.
4. Chaque push déclenche un déploiement (preview sur les branches, production sur `main`).

## Structure du projet

```
app/[locale]/            Pages (accueil, projects, projects/[slug], about, contact)
app/api/contact/         Route API du formulaire de contact
components/ui/            Composants shadcn/ui (Radix)
components/layout/        Header, footer, toggle de thème, sélecteur de langue, curseur personnalisé
components/sections/      Sections de la page d'accueil (hero, stats, skills, cta...)
components/project/       Carte projet, filtres, détail de projet, panneau de métriques
content/projects/         Contenu de chaque projet (JSON, FR + EN)
lib/                      Types, chargement des projets, schéma de contact, données de compétences
messages/                 Traductions de l'interface (FR/EN)
i18n/                     Configuration next-intl (routing, navigation, request)
public/cv/                CV téléchargeable (PDF)
public/images/projects/   Visuels des projets (SVG placeholder pour les projets 7-11)
```

## État du contenu

Les projets 1 à 6 (Deep Learning Churn, XGBoost Churn V1, Assistant O2S, RAG Correctif Hybride, Framework de Migration hexagonal, ETL-Bot RPA) contiennent du contenu réel. Les projets 7 à 11 (Speech-to-Text, Text-to-Speech, Conception d'API, 2 emplacements libres) sont des structures placeholder marquées `[À COMPLÉTER]` côté FR et `[TO COMPLETE]` côté EN — à remplir dans `content/projects/` sans inventer de métriques.
