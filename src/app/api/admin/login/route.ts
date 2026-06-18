import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth/session";
import { passwordsMatch } from "@/lib/auth/password";

type LoginRequest = {
  password?: unknown;
};

export async function POST(request: Request) {
  let body: LoginRequest;

  try {
    body = (await request.json()) as LoginRequest;
  } catch {
    return NextResponse.json(
      { error: "Dados enviados em formato inválido." },
      { status: 400 },
    );
  }

  const password =
    typeof body.password === "string" ? body.password : "";
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminPassword || !sessionSecret) {
    return NextResponse.json(
      { error: "Acesso administrativo não configurado." },
      { status: 500 },
    );
  }

  if (!passwordsMatch(password, adminPassword)) {
    return NextResponse.json(
      { error: "Senha inválida." },
      { status: 401 },
    );
  }

  const token = await createSessionToken(sessionSecret);
  const response = NextResponse.json({ success: true });

  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });

  return response;
}
