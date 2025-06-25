import { getCollections, getUserByEmail } from "@/lib/dbCollections";
import { verifyToken } from "@/lib/jwt";
import { verifyOperator } from "@/lib/verifyOperator";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const { ongoingProjectsCollection } = await getCollections();
    // filter object if volunteer
    let filter = {approved : true};
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await getUserByEmail(decoded?.email);

        if (user?.role === "volunteer") {
          filter = { author: user.name };
        }
      } catch (err) {
        console.warn("Invalid or expired token:");
      }
    }
    const project = await ongoingProjectsCollection.find(filter).toArray();

    return Response.json({ success: true, data: project });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { success: false, message: "Failed to get project" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await verifyOperator(); // only admin and volunteer can post

    const body = await req.json();
    const { ongoingProjectsCollection } = await getCollections();

    const result = await ongoingProjectsCollection.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, message: "Failed to add story" },
      { status: 500 }
    );
  }
}
