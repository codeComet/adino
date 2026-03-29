"use client";

import { usePathname } from "next/navigation";
import CommonHeader from "@/components/header/CommonHeader";
import { useEffect, useMemo, useState } from "react";

const pageLogoCache = new Map();

const PAGE_LOGO_ENDPOINT_BY_PATH = {
  "/": "/api/home-page?populate=pageLogo",
  "/about": "/api/about-page?populate=pageLogo",
  "/careers": "/api/career?populate=pageLogo",
  "/contact": "/api/contact?populate=pageLogo",
  "/insights": "/api/insight?populate=pageLogo",
  "/subsidiaries/adino-partners": "/api/adino-partner?populate=pageLogo",
  "/subsidiaries/adino-global-market":
    "/api/adino-global-market?populate=pageLogo",
  "/subsidiaries/adino-capital": "/api/adino-capital?populate=pageLogo",
  "/subsidiaries/asset-management":
    "/api/adino-asset-management?populate=pageLogo",
  "/subsidiaries/adino-partners-service":
    "/api/adino-partners-service?populate=pageLogo",
  "/subsidiaries/adino-capital-service":
    "/api/adino-capital-service?populate=pageLogo",
  "/subsidiaries/asset-management-service":
    "/api/asset-management-service?populate=pageLogo",
  "/subsidiaries/about-adino-partners":
    "/api/about-adino-partner?populate=pageLogo",
  "/subsidiaries/about-adino-global-market":
    "/api/about-adino-global-market?populate=pageLogo",
  "/subsidiaries/about-adino-capital":
    "/api/about-adino-capital?populate=pageLogo",
  "/subsidiaries/about-asset-management":
    "/api/about-asset-management?populate=pageLogo",
  "/subsidiaries/adino-executive-management":
    "/api/global-market-executive-management?populate=pageLogo",
};

function extractPageLogo(payload) {
  const data = payload?.data;
  if (!data) return null;

  if (Array.isArray(data)) {
    const first = data[0];
    return first?.attributes?.pageLogo ?? first?.pageLogo ?? null;
  }

  return data?.attributes?.pageLogo ?? data?.pageLogo ?? null;
}

export default function HeaderWrapper() {
  const pathname = usePathname();
  const [fetchedLogo, setFetchedLogo] = useState(() => ({
    pathname: null,
    media: null,
  }));

  const pageLogoEndpoint = useMemo(
    () => PAGE_LOGO_ENDPOINT_BY_PATH[pathname] || null,
    [pathname],
  );

  const cachedLogoMedia = useMemo(() => {
    if (!pathname) return null;
    return pageLogoCache.get(pathname) ?? null;
  }, [pathname]);

  const logoMedia = useMemo(() => {
    if (!pathname || !pageLogoEndpoint) return null;
    if (cachedLogoMedia) return cachedLogoMedia;
    if (fetchedLogo.pathname === pathname) return fetchedLogo.media;
    return null;
  }, [cachedLogoMedia, fetchedLogo, pathname, pageLogoEndpoint]);

  useEffect(() => {
    let cancelled = false;

    if (!pathname || !pageLogoEndpoint) {
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    if (!baseUrl) {
      return;
    }

    if (pageLogoCache.has(pathname)) {
      return;
    }

    const normalizedBaseUrl = baseUrl.endsWith("/")
      ? baseUrl.slice(0, -1)
      : baseUrl;

    const controller = new AbortController();

    fetch(`${normalizedBaseUrl}${pageLogoEndpoint}`, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return;
        const extracted = extractPageLogo(json);
        pageLogoCache.set(pathname, extracted);
        setFetchedLogo({ pathname, media: extracted });
      })
      .catch(() => {
        if (cancelled) return;
        setFetchedLogo({ pathname, media: null });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [pathname, pageLogoEndpoint]);

  return <CommonHeader logoMedia={logoMedia} />;
}
