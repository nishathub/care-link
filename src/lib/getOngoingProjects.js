import { getCollections } from "@/lib/mongo";
import { verifyToken, getUserByEmail } from "@/lib/auth";
import { cookies } from "next/headers";

export async function getOngoingProjects() {
  const { ongoingProjectsCollection } = await getCollections();
  let filter = { approved: true, hidden: false };

  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    try {
      const decoded = verifyToken(token);
      const user = await getUserByEmail(decoded?.email);

      if (user?.role === "admin") {
        filter = { approved: true };
      } else if (user?.role === "volunteer") {
        filter = { author: user.name };
      }
    } catch (err) {
      console.warn("Invalid or expired token:");
    }
  }

  const projects = await ongoingProjectsCollection.find(filter).toArray();
  return projects;
}
