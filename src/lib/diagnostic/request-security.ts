import "server-only";

type BodyErrorStatus = 400 | 413 | 415;

type JsonBodyResult =
  | { ok: true; data: unknown }
  | { ok: false; status: BodyErrorStatus; error: string };

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const globalRateLimit = globalThis as typeof globalThis & {
  sorDiagnosticRateLimit?: Map<string, RateLimitEntry>;
};

const rateLimitStore =
  globalRateLimit.sorDiagnosticRateLimit ?? new Map<string, RateLimitEntry>();

globalRateLimit.sorDiagnosticRateLimit = rateLimitStore;

function getClientAddress(request: Request) {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");

  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function pruneRateLimitStore(now: number) {
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }

  while (rateLimitStore.size > 5000) {
    const oldestKey = rateLimitStore.keys().next().value;
    if (typeof oldestKey !== "string") break;
    rateLimitStore.delete(oldestKey);
  }
}

export function checkRateLimit(
  request: Request,
  scope: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  const key = `${scope}:${getClientAddress(request)}`;
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    if (rateLimitStore.size > 5000) pruneRateLimitStore(now);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<JsonBodyResult> {
  const mediaType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    ?.trim()
    .toLowerCase();

  if (mediaType !== "application/json") {
    return {
      ok: false,
      status: 415,
      error: "O conteúdo deve ser enviado como application/json.",
    };
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return {
      ok: false,
      status: 413,
      error: "O conteúdo enviado excede o limite permitido.",
    };
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "Dados enviados em formato inválido." };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let receivedBytes = 0;
  let rawBody = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      receivedBytes += value.byteLength;
      if (receivedBytes > maxBytes) {
        await reader.cancel();
        return {
          ok: false,
          status: 413,
          error: "O conteúdo enviado excede o limite permitido.",
        };
      }

      rawBody += decoder.decode(value, { stream: true });
    }

    rawBody += decoder.decode();
  } catch {
    return { ok: false, status: 400, error: "Dados enviados em formato inválido." };
  } finally {
    reader.releaseLock();
  }

  try {
    return { ok: true, data: JSON.parse(rawBody) as unknown };
  } catch {
    return { ok: false, status: 400, error: "Dados enviados em formato inválido." };
  }
}
