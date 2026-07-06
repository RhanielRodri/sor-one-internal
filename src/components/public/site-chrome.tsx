"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import { RevealManager } from "@/components/public/reveal-manager";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="public-site flex min-h-screen flex-col">
      <RevealManager />
      <Header />
      <main className="public-shell flex-1">{children}</main>
      <Footer />
    </div>
  );
}
