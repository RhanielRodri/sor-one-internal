import Link from "next/link";
import { Container } from "@/components/public/container";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-foreground">
          {SITE_NAME}
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button href="/diagnostico" className="px-4">
          Diagnóstico gratuito
        </Button>
      </Container>
    </header>
  );
}
