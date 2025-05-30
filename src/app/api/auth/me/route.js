import { verifyTokenJWT } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await verifyTokenJWT();
    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ success: false, user: null }, { status: 401 });
  }
};
