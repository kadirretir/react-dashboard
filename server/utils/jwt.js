import { SignJWT, jwtVerify } from "jose";
import { TextEncoder } from "util";


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// ACCESS TOKEN (expired in 15 minutes)
export async function generateAccessToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m") // 15 dakika geçerli
    .sign(secret);
}


const secretRefresh = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);


export async function generateRefreshToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d") // 30 gün geçerli
    .sign(secretRefresh);
}

export async function verifyToken (token, options = undefined) {
  try {
    const verification = await jwtVerify(token, secret);
    return options?.returnPayload ? verification.payload : true;
  } catch {
    return false;
  }
}