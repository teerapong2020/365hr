// middleware.js (root ของโปรเจกต์)
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const role = payload.role;

    if (pathname.startsWith("/hr") && role !== "hr") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/sale") && role !== "salesman") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/hr/:path*", "/sale/:path*"], // กำหนด path ที่ middleware ตรวจ
};
