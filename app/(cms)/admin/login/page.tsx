import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import LoginForm from "@/components/cms/auth/LoginForm";
import { BRAND } from "@/components/cms/theme";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
      }}
    >
      <section
        aria-hidden="true"
        style={{
          background: BRAND.gradientNav,
          color: "#fff",
          padding: "48px clamp(24px, 6vw, 72px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 240,
        }}
      >
        <Image src="/fev.svg" alt="" width={40} height={40} priority />
        <div>
          <p style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7, margin: 0 }}>
            Cordinit CMS
          </p>
          <h1 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.15, margin: "12px 0 0", fontWeight: 700 }}>
            Every page, every section, one place.
          </h1>
        </div>
      </section>
      <section style={{ display: "grid", placeItems: "center", padding: "48px 24px", background: "#fff" }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
