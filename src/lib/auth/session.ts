export const SESSION_COOKIE_NAME = "sor_admin_session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  expiresAt: number;
};

function encodeBase64Url(value: string) {
  return btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(normalized + padding);
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );

  return encodeBase64Url(
    String.fromCharCode(...new Uint8Array(signature)),
  );
}

export async function createSessionToken(secret: string) {
  const payload: SessionPayload = {
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await sign(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(token: string, secret: string) {
  const [encodedPayload, receivedSignature] = token.split(".");

  if (!encodedPayload || !receivedSignature) {
    return false;
  }

  const expectedSignature = await sign(encodedPayload, secret);

  if (receivedSignature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(
      decodeBase64Url(encodedPayload),
    ) as SessionPayload;

    return (
      typeof payload.expiresAt === "number" &&
      payload.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}
