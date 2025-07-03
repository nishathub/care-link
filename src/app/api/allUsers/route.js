import { getCollections } from "@/lib/dbCollections";
import { verifyAdmin } from "@/lib/verifyAdmin";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

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
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to CareLink Family",
      html: `<h1>Hi ${name}!</h1>
       <p>Thanks for registering with <strong>CareLink</strong>!</p> 
       <p>Please keep patience until we check and approve your profile.</p>
       <p>
         Best regards,<br />
         The <strong>CareLink</strong> Team
       </p>`,
    });

    if (error) {
      console.error("mail error: ", error)
      return Response.json(
        {
          success: false,
          message: "Registration successful, but email failed to send.",
        },
        { status: 500 }
      );
    }

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
