import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(
  "CIsImV4cCI6MTc1NDkzODYzMywiaWF0IjoxNzU0MzMzODMzLCJqdGkiOiIicmVmcmVzaCIsImV4cCI6MTc1"
);

export async function encryptCookie(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10y") // 10 years
    .sign(secret);
}

export async function decryptCookie(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}
