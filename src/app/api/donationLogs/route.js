import { getCollections } from "@/lib/dbCollections";
import { getDonationLogs } from "@/lib/getDonationLogs";
import { verifyAdmin } from "@/lib/verifyAdmin";

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

