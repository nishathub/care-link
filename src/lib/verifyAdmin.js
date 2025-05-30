import { getAdminByEmail } from "./dbCollections.js";
import { verifyTokenJWT } from "./verifyToken.js";

export const verifyAdmin = async () => {
  const decoded = await verifyTokenJWT();
  const user = await getAdminByEmail(decoded?.email);
  if (!user || user.role !== "Admin") {
    throw new Error("Forbidden");
  }
  return user;
};
