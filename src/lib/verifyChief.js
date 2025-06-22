import { getAdminByEmail } from "./dbCollections.js";
import { verifyTokenJWT } from "./verifyToken.js";

export const verifyChief = async () => {
  const decoded = await verifyTokenJWT();
  const user = await getAdminByEmail(decoded?.email);
  if (!user || user.rank !== "chief") {
    throw new Error("Forbidden");
  }
  return user;
};