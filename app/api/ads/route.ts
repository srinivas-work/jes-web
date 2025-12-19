import { NEXT_PUBLIC_BUCKET_URL } from "@/utils/data/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const pageUrl = `${NEXT_PUBLIC_BUCKET_URL}/ad-page/index.html`;

    const resp = await fetch(pageUrl);
    const html = await resp.text();

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch {
    return new NextResponse("Error loading page", { status: 500 });
  }
}
