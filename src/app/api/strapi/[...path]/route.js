export const runtime = "nodejs";

const getStrapiBaseUrl = () =>
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "";

const toUpstreamUrl = (baseUrl, pathSegments, search) => {
  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;
  const normalizedPath = pathSegments.length
    ? `/api/${pathSegments.join("/")}`
    : "/api";
  return `${normalizedBase}${normalizedPath}${search || ""}`;
};

export async function GET(request, { params }) {
  const baseUrl = getStrapiBaseUrl();

  if (!baseUrl) {
    return Response.json(
      { error: "STRAPI_URL is not configured" },
      { status: 500 },
    );
  }

  const pathSegments = Array.isArray(params?.path) ? params.path : [];
  const upstreamUrl = toUpstreamUrl(baseUrl, pathSegments, request.nextUrl.search);

  try {
    const res = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? await res.text()
      : await res.text();

    return new Response(body, {
      status: res.status,
      headers: {
        "content-type": contentType || "application/json; charset=utf-8",
        "cache-control": "s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to reach Strapi", details: String(error) },
      { status: 502 },
    );
  }
}

