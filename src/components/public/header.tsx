import Link from "next/link";
import { Container } from "@/components/public/container";
import { PublicNav } from "@/components/public/public-nav";
import { SorLogo } from "@/components/ui/SorLogo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(201,168,106,0.08)] bg-[rgba(10,14,18,0.82)] backdrop-blur-[16px]">
      <Container className="grid min-h-18 max-w-[92rem] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="SOR ONE — Início" className="shrink-0">
          <SorLogo variant="horizontal" />
        </Link>
        <PublicNav />
        <span aria-hidden="true" className="hidden md:block" />
      </Container>
    </header>
  );
}
