import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
    const cookieStore = await cookies();
  cookieStore.delete("token");
  return NextResponse.json({success: true, message: "Logged out" });
};
