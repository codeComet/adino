import { NextResponse } from "next/server";

export async function GET(request) {
  const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { error: "Missing STRAPI_URL environment variable" },
      { status: 500 },
    );
  }

  const normalizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const targetUrl = `${normalizedBaseUrl}/api/footer${
    queryString ? `?${queryString}` : ""
  }`;

  const upstreamRes = await fetch(targetUrl, {
    headers: { accept: "application/json" },
    next: { revalidate: 300 },
  });

  const bodyText = await upstreamRes.text();
  const contentType =
    upstreamRes.headers.get("content-type") || "application/json";

  return new NextResponse(bodyText, {
    status: upstreamRes.status,
    headers: {
      "content-type": contentType,
      "cache-control": "public, s-maxage=300, stale-while-revalidate=1800",
    },
  });
}
