// pages/_middleware.js (Next.js 12+)
import { NextResponse } from "next/server";

export function middleware(req) {
  const ua = req.headers.get("user-agent") || ""

  // blok request dari axios, curl, python, dll
  if (/axios|curl|python|wget|postman|cheerio/i.test(ua)) {
    return new NextResponse("Access Denied", { status: 403 })
  }

  return NextResponse.next()
}
