import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="public-shell flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
