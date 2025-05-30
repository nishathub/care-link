import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { getAdminByEmail } from "@/lib/dbCollections";
import { signToken } from "@/lib/jwt";

export const POST = async (req) => {
  const { email, password } = await req.json();
  // we check if the email is from a stored admin object in the database.
  const user = await getAdminByEmail(email);
  if (!user) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }
  // then we cross check the password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
  }
  // after passing two steps, we sign for jwt
  const payload = { id: user._id, name: user.name, email: user.email, role: user.role };
  const token = signToken(payload);
  // finally cookies is set
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  return NextResponse.json({success: true, message: "Login successful" });
};
