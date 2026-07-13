"use client";

import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import { RevealManager } from "@/components/public/reveal-manager";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-site flex min-h-screen flex-col">
      <RevealManager />
      <Header />
      <main id="conteudo" className="public-shell flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
