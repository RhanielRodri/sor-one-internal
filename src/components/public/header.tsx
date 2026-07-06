"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/public/container";
import { PublicNav } from "@/components/public/public-nav";
import { SorLogo } from "@/components/ui/SorLogo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(6,7,9,0.96)" : "rgba(6,7,9,0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderColor: "var(--border-soft)",
      }}
    >
      <Container className="grid min-h-18 max-w-[92rem] grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link
          href="/"
          aria-label="SOR ONE — Início"
          className="col-start-1 shrink-0 justify-self-start"
        >
          <SorLogo variant="horizontal" />
        </Link>
        <PublicNav />
      </Container>
    </header>
  );
}
