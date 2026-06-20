import { Sidebar } from "@/components/admin/sidebar";

export default function ConsoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-[#05070d] text-foreground">
      <Sidebar />
      <main className="p-5 sm:p-8 lg:ml-68 lg:p-10 xl:p-12">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
