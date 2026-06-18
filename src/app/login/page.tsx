import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Login administrativo",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <Card className="w-full max-w-md p-7 sm:p-9">
        <p className="text-sm font-semibold text-accent">SOR ONE Internal</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Acesso ao console
        </h1>
        <p className="mt-3 mb-7 text-sm leading-6 text-muted">
          Informe a senha administrativa para acompanhar os leads.
        </p>
        <Suspense fallback={<p className="text-sm text-muted">Carregando...</p>}>
          <LoginForm />
        </Suspense>
      </Card>
    </main>
  );
}
