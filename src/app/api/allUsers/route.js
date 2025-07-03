import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";
import { sendWelcomeEmail } from "@/utils/sendMail";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await verifyAdmin(); // only admins get all user collection

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
    const body = await req.json();
    const { password, email, name } = body;
    if (!password) {
      throw new Error("Password is required");
    }
    //hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //new userData
    const newUserData = { ...body, password: hashedPassword };

    const { UsersCollection } = await getCollections();

    const result = await UsersCollection.insertOne(newUserData);

    //send mail
    await sendWelcomeEmail({recipientMail: email, name: name});

    return Response.json({
      success: true,
      message: "Registered & email sent successfully!",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("POST error:");
    return Response.json(
      { success: false, message: "Registration Failed" },
      { status: 500 }
    );
  }
}
