import { getUserByEmail } from "./dbCollections.js";
import { verifyTokenJWT } from "./verifyToken.js";

export const verifyOperator = async () => {
  const decoded = await verifyTokenJWT();
  const user = await getUserByEmail(decoded?.email);
  if (!user || (user.role !== "admin" && user.role !== "volunteer")) {
    throw new Error("Forbidden");
  }
  return user;
};
