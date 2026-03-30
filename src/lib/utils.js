import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStrapiMedia(input) {
  if (!input) return "";

  let url = input;

  // Strapi object shapes
  if (typeof input === "object") {
    url =
      input?.data?.attributes?.url ||
      input?.url ||
      input?.attributes?.url ||
      "";
  }

  if (!url || typeof url !== "string") return "";

  // Already absolute
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  // Protocol-relative (rare)
  if (url.startsWith("//")) return `https:${url}`;

  // Prefix any relative Strapi url if base exists
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";

  if (!base) return url; // fallback (still relative)

  // Avoid double slashes
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

  return `${normalizedBase}${normalizedUrl}`;
}

export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export async function fetchStrapi(pathWithQuery) {
  const res = await fetch(`${STRAPI_BASE_URL}${pathWithQuery}`);
  const data = await res.json();
  return data;
}

export const renderDescription = (text, options = {}) => {
  if (!text) return null;

  // Replace <br/> with a placeholder to split, handling potential variations
  const parts = text.split(/<br\s*\/?>|\n\n/);

  return parts.map((part, index) => {
    const trimmed = part.trim();
    if (!trimmed) return null;
    return (
      <p
        key={index}
        className={cn("font-lato font-normal text-base md:text-lg leading-[28px] text-[#666666] mb-6 last:mb-0", options.pClassName)}
      >
        {trimmed}
      </p>
    );
  });
};

export const renderDescriptionFromEditor = (arr, options = {}) => {
  if (!arr?.length) return null;

  const { pClassName, liClassName, listClassName, olClassName, ulClassName } =
    options;

  const getNodeText = (node) => {
    if (!node) return "";
    if (typeof node.text === "string") return node.text;
    if (Array.isArray(node.children))
      return node.children.map(getNodeText).join("");
    return "";
  };

  const basePClassName =
    "font-lato font-normal text-base md:text-lg leading-[28px] text-[#666666] mb-6 last:mb-0";
  const baseLiClassName =
    "font-lato font-normal text-base md:text-lg leading-[28px] text-[#666666]";
  const baseListClassName = "pl-5 mb-6 last:mb-0";

  return arr.map((item, index) => {
    if (item?.type === "paragraph") {
      return (
        <p key={index} className={cn(basePClassName, pClassName)}>
          {Array.isArray(item.children)
            ? item.children.map(getNodeText).join("")
            : ""}
        </p>
      );
    }

    if (item?.type === "list") {
      const isOrdered = item.format === "ordered";
      const ListTag = isOrdered ? "ol" : "ul";

      return (
        <ListTag
          key={index}
          className={cn(
            baseListClassName,
            isOrdered ? "list-decimal" : "list-disc",
            listClassName,
            isOrdered ? olClassName : ulClassName,
          )}
        >
          {Array.isArray(item.children)
            ? item.children.map((listItem, liIndex) => (
                <li key={liIndex} className={cn(baseLiClassName, liClassName)}>
                  {Array.isArray(listItem?.children)
                    ? listItem.children.map(getNodeText).join("")
                    : ""}
                </li>
              ))
            : null}
        </ListTag>
      );
    }

    return null;
  });
};
