import "server-only";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth/session";

export async function isAdminRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!token || !secret) {
    return false;
  }

  return verifySessionToken(token, secret);
}
