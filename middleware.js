import { NextResponse } from "next/server";

export function middleware(req) {
  const ua = req.headers.get("user-agent") || "";

  // Contoh: blok bot tertentu
  if (/axios|curl|python|wget|postman|cheerio/i.test(ua)) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  return NextResponse.next();
}

// Middleware ini jalan di semua path
export const config = {
  matcher: "/:path*",
};
