import { NextResponse } from "next/server";

export function GET(req) {
  const url = new URL(req.url);
  const search = url.search; // includes leading '?'
  const dest = `/api/auth/callback/discord${search}`;
  return NextResponse.redirect(dest);
}
