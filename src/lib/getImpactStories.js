import { cookies } from "next/headers";
import { getCollections, getUserByEmail } from "./dbCollections";
import { verifyToken } from "./jwt";

export const getImpactStories = async () => {
    const { ImpactStoriesCollection } = await getCollections();
        // fetch only displayed item for public
        let filter = {hidden: false };
        // fetch all for admin
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
        const stories = await ImpactStoriesCollection.find(filter).toArray();
        return stories;
}