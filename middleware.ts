import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NEXT_PUBLIC_BUCKET_URL } from "./utils/data/constants";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Skip if already pointing to S3 (prevent redirect loops)
  if (url.href.includes(NEXT_PUBLIC_BUCKET_URL)) {
    return NextResponse.next();
  }

  // Skip Next.js internal routes and API routes - ADD /api/models to the exception
  if (
    path.startsWith("/_next/") ||
    path.startsWith("/api/") ||
    path.includes("/flipBook")
  ) {
    return NextResponse.next();
  }

  // Static file detection
  const staticFileRegex = /\.[a-zA-Z0-9]{1,10}$/;

  // Your existing static file extensions
  const commonStaticExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "svg",
    "ico",
    "webp",
    "avif",
    "pdf",
    "txt",
    "zip",
    "rar",
    "7z",
    "tar",
    "gz",
    "json",
    "xml",
    "csv",
    "css",
    "js",
    "jsx",
    "ts",
    "tsx",
    "woff",
    "woff2",
    "ttf",
    "eot",
    "mp4",
    "webm",
    "mov",
    "avi",
    "mkv",
    "mp3",
    "wav",
    "ogg",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "glb",
    "gltf",
  ];

  const hasExtension = staticFileRegex.test(path);
  const hasCommonExtension = commonStaticExtensions.some((ext) =>
    path.toLowerCase().endsWith(`.${ext}`)
  );

  // Redirect if it has any file extension OR is a common static file extension
  if (hasExtension || hasCommonExtension) {
    let s3Path = path;

    // Remove /en-US prefix for S3 bucket paths
    if (path.startsWith("/en-US/")) {
      s3Path = path.replace("/en-US", "");
    }

    // // For development, you might want to log this
    // if (process.env.NODE_ENV === "development") {
    //   console.log(`Redirecting ${path} to S3 path: ${s3Path}`);
    // }

    url.href = `${NEXT_PUBLIC_BUCKET_URL}${s3Path}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all paths except internal assets & Next.js special files
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
};
