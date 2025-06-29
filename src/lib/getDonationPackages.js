import { cookies } from "next/headers";
import { getCollections, getUserByEmail } from "./dbCollections";
import { verifyToken } from "./jwt";

export const getDonationPackages = async () => {
  const { DonationPackages } = await getCollections();
  // Skip the hidden packages for public
  let filter = { hidden: false };
  // all for admin
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    try {
      const decoded = verifyToken(token);
      const user = await getUserByEmail(decoded?.email);

      if (user?.role === "admin") {
        filter = {};
      }
    } catch (err) {
      console.warn("Invalid or expired token:");
    }
  }
  const packages = await DonationPackages.find(filter).toArray();
  return packages;
};
