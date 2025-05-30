import { getCollections } from "./dbCollections.js";
import { verifyTokenJWT } from "./verifyToken.js";
export const verifyAdmin = async () => {
  const decoded = verifyTokenJWT(); // { id, email, role }

  const { AdminCollection } = await getCollections();
  const user = await AdminCollection.findOne({email: decoded?.email});

  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }

  return user;
};
