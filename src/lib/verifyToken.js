import { cookies } from "next/headers";
import { verifyToken } from "./jwt.js";

export const verifyTokenJWT = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch {
    throw new Error("Forbidden");
  }
};
