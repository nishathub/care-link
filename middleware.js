import { verifyAdmin } from "@/lib/verifyAdmin";
import { NextResponse } from "next/server";

const protectedRoutes = {
  "/admin": ["admin"],
  "/editor": ["admin", "editor"],
  "/volunteer": ["admin", "volunteer"],
  "/donor-dashboard": ["admin", "donor"],
};

export const middleware = async (request) => {
  const pathname = request.nextUrl.pathname;
  console.log(pathname);

  // Check if this path is protected
  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) return NextResponse.next(); // give access to unprotected routes

  try {
    const user = await verifyAdmin(); // if valid, return user data from that middleware

    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const userRole = user?.role;
    console.log(userRole);

    const allowedRoles = protectedRoutes[matchedRoute]; // array of allowed roles to access protected pages

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};
