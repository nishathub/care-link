import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  try {
    const { UsersCollection } = await getCollections();
    const users = await UsersCollection.find().toArray();

    return Response.json({ success: true, data: users });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { success: false, message: "Failed to get users" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await verifyAdmin(); // only admin can post

    const body = await req.json();
    const { UsersCollection } = await getCollections();

    const result = await UsersCollection.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, message: "Failed to add user" },
      { status: 500 }
    );
  }
}
