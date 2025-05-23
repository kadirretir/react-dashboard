import { SignJWT } from "jose";
import { TextEncoder } from "util";


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateAccessToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m") // 15 dakika geçerli
    .sign(secret);
}
