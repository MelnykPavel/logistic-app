import { AuthPayload } from "@/types/auth";
import { JWTPayload, SignJWT, jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "a-very-long-random-secret-generated-once-and-kept-safe";
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || "1d";
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || "https://myapp.example.com";
const JWT_ISSUER = process.env.JWT_ISSUER || "https://myapp.example.com";

const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function signJwt(payload: AuthPayload) {
  return await new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(JWT_EXPIRATION_TIME)
    .sign(secretKey);
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });
    return payload as JWTPayload & { payload: AuthPayload };
  } catch {
    return null;
  }
}
