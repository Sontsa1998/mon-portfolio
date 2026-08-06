export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Christian Sontsa Kiteu",
    jobTitle: "AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Groupe Harvest",
    },
    url: "https://christian-sontsa-kiteu.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/csontsakiteu",
      "https://github.com/Sontsa1998",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    knowsLanguage: ["fr", "en"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProjectJsonLd({
  title,
  description,
  slug,
  stack,
}: {
  title: string;
  description: string;
  slug: string;
  stack: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: `https://christian-sontsa-kiteu.vercel.app/projects/${slug}`,
    author: {
      "@type": "Person",
      name: "Christian Sontsa Kiteu",
    },
    keywords: stack.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
