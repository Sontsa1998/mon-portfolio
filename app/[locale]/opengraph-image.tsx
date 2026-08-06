import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline =
    locale === "fr"
      ? "Ingenieur IA — Deep Learning, RAG & Agents, Data Engineering"
      : "AI Engineer — Deep Learning, RAG & Agents, Data Engineering";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(circle at 0% 100%, rgba(99,102,241,0.3), transparent 55%)",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#f5f5f7",
            display: "flex",
          }}
        >
          Christian Sontsa Kiteu
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            color: "#a1a1aa",
            display: "flex",
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
