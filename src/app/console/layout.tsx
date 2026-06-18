import { Sidebar } from "@/components/admin/sidebar";

export default function ConsoleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="p-5 sm:p-8 lg:ml-64 lg:p-10">{children}</main>
    </div>
  );
}
