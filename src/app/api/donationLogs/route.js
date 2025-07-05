import { getCollections } from "@/lib/dbCollections";
import { getDonationLogs } from "@/lib/getDonationLogs";

export async function GET() {
  try {
    const Logs = await getDonationLogs();
    return Response.json({ success: true, data: Logs });
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
    const body = await req.json();
    const { DonationLogs } = await getCollections();

    const result = await DonationLogs.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, message: "Failed to add Log" },
      { status: 500 }
    );
  }
}
