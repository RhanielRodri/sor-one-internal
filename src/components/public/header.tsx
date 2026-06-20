import Link from "next/link";
import { Container } from "@/components/public/container";
import { PublicNav } from "@/components/public/public-nav";
import { SorLogo } from "@/components/ui/SorLogo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-400/[0.06] bg-[rgba(5,6,7,0.76)] backdrop-blur-[14px]">
      <Container className="grid min-h-18 max-w-[92rem] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="SOR OS — Início" className="shrink-0">
          <SorLogo variant="horizontal" />
        </Link>
        <PublicNav />
        <span aria-hidden="true" className="hidden md:block" />
      </Container>
    </header>
  );
}
