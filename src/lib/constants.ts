export const SITE_NAME = "SOR ONE";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sor-one.vercel.app";

export const NAV_ITEMS = [
  { key: "home" as const, href: "/" },
  { key: "solutions" as const, href: "/#solucoes" },
  { key: "projects" as const, href: "/projetos" },
];
