import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { SorLogo } from "@/components/ui/SorLogo";

export const metadata: Metadata = {
  title: "Login administrativo",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-[var(--sor-bg)] lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden border-r border-[var(--sor-border-champagne)] bg-[var(--sor-bg-soft)] p-12 text-[var(--sor-text)] lg:flex lg:flex-col lg:justify-between">
        <div className="premium-grid absolute inset-0 opacity-20" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-[rgba(14,165,164,0.1)] blur-3xl" />
        <Link href="/" className="relative flex items-center gap-3">
          <SorLogo variant="horizontal" />
        </Link>
        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--sor-petrol)]">Operação aplicada</p>
          <h1 className="mt-5 text-5xl font-black leading-[1.08] tracking-[-0.05em]">A estrutura interna por trás do SOR.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--sor-text-soft)]">Leads, diagnósticos e evolução comercial centralizados em um ambiente simples e seguro.</p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {["Captação", "Operação", "Insights"].map((item) => <div key={item} className="rounded-2xl border border-[var(--sor-border-petrol)] bg-[rgba(17,26,32,0.72)] p-4 text-sm font-bold">{item}</div>)}
          </div>
        </div>
        <p className="relative text-xs text-[var(--sor-text-soft)]">Acesso restrito · SOR OS Internal</p>
      </section>
      <section className="relative flex items-center justify-center overflow-hidden bg-[var(--sor-bg)] px-5 py-12">
        <div className="premium-grid absolute inset-0" />
        <div className="relative w-full max-w-md">
          <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <SorLogo variant="horizontal" />
          </Link>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--sor-petrol)]">Console privado</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">Acessar SOR OS Console.</h2>
          <p className="mt-3 mb-8 leading-7 text-muted">Entre com a senha administrativa para acompanhar a operação.</p>
          <div className="relative rounded-2xl border border-[var(--sor-border-champagne)] bg-[var(--sor-panel)] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.34)] sm:p-8">
            <Suspense fallback={<p className="text-sm text-muted">Carregando...</p>}>
              <LoginForm />
            </Suspense>
          </div>
          <p className="mt-6 text-center text-xs text-soft">Sessão protegida por cookie seguro e acesso restrito.</p>
        </div>
      </section>
    </main>
  );
}
