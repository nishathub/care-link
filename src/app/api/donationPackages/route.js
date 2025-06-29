import { getCollections, getUserByEmail } from "@/lib/dbCollections";
import { verifyToken } from "@/lib/jwt";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { cookies } from "next/headers";

export async function GET() {
  try {
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

    return Response.json({ success: true, data: packages });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { success: false, message: "Failed to get stories" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await verifyAdmin(); // only admin can post

    const body = await req.json();
    const { DonationPackages } = await getCollections();

    const result = await DonationPackages.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, message: "Failed to add story" },
      { status: 500 }
    );
  }
}
