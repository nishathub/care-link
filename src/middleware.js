import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

const protectedRoutes = {
  "/admin": ["admin"],
  "/editor": ["admin", "editor"],
  "/volunteer": ["admin", "volunteer"],
  "/donor": ["admin", "donor"],
};

export const middleware = async (request) => {
  const pathname = request.nextUrl.pathname;

  // Check if this path is protected
  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) return NextResponse.next(); // give access to unprotected routes

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret); // using jose
    const userRole = payload?.role;

    const allowedRoles = protectedRoutes[matchedRoute]; // array of allowed roles to access protected pages

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url)); // valid user but role is not allowed
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/admin/:path*", "/editor/:path*", "/volunteer/:path*", "/donor/:path*"],
};
