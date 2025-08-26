// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const ua = req.headers.get("user-agent") || "";

  // Contoh: blok bot kalau akses halaman UI
  if (/axios|curl|python|wget|postman|cheerio/i.test(ua)) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Terapkan hanya ke semua route halaman,
    // kecuali /api dan /_next (asset Next.js)
    "/((?!api|_next|static|favicon.ico).*)",
  ],
};
