import Link from "next/link";
import { Container } from "@/components/public/container";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container className="grid gap-8 py-10 sm:grid-cols-2 sm:items-end">
        <div>
          <p className="font-extrabold tracking-tight">{SITE_NAME}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted">
            Tecnologia simples para pequenos negócios venderem e se organizarem melhor.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
