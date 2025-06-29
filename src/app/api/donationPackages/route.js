import { getCollections } from "@/lib/dbCollections";
import { getDonationPackages } from "@/lib/getDonationPackages";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  try {
    const packages = await getDonationPackages();
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
