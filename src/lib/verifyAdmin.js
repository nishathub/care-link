import { getUserByEmail } from "./dbCollections.js";
import { verifyTokenJWT } from "./verifyToken.js";

export const verifyAdmin = async () => {
  const decoded = await verifyTokenJWT();
  const user = await getUserByEmail(decoded?.email);
  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
};
