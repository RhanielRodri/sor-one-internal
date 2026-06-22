import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="public-shell flex-1">{children}</main>
      <Footer />
    </div>
  );
}
