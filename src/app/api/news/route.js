import { getCollections } from "@/lib/dbCollections";
import { getNews } from "@/lib/getNews";
import { verifyAdmin } from "@/lib/verifyAdmin";

export async function GET() {
  try {
    const news = await getNews();
    return Response.json({ success: true, data: news });
  } catch (error) {
    console.error("GET error:", error);
    return Response.json(
      { success: false, message: "Failed to get news" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await verifyAdmin(); // only admin can post

    const body = await req.json();
    const { NewsCollection } = await getCollections();

    const result = await NewsCollection.insertOne(body);

    return Response.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("POST error:", error);
    return Response.json(
      { success: false, message: "Failed to add news" },
      { status: 500 }
    );
  }
}
