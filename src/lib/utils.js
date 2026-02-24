import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiMedia(url) {
  if (url == null) return "";

  // If the input is an object, extract the url string
  if (typeof url === "object") {
    if (url.data && url.data.attributes && url.data.attributes.url) {
      url = url.data.attributes.url;
    } else if (url.url) {
      url = url.url;
    } else {
      return "";
    }
  }

  if (typeof url !== "string") return "";
  if (url.startsWith("http")) return url;
  if (
    process.env.NEXT_PUBLIC_NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_STRAPI_URL
  ) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  }

  return url;
}

export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export async function fetchStrapi(pathWithQuery) {
  const res = await fetch(`${STRAPI_BASE_URL}${pathWithQuery}`);
  const data = await res.json();
  return data;
}
