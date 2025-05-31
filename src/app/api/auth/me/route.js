import { verifyTokenJWT } from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const user = await verifyTokenJWT();
    return NextResponse.json({ success: true, isAuthenticated: true, user });
  } catch (err) {
    return NextResponse.json({ isAuthenticated: false, user: null });
  }
};
