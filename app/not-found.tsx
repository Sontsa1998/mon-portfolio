import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0a0a0f",
          color: "#f5f5f7",
        }}
      >
        <Link href="/fr" style={{ color: "#8b5cf6" }}>
          404 — Go home
        </Link>
      </body>
    </html>
  );
}
