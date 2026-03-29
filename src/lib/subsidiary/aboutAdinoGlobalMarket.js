"use client";

import { useQuery } from "@tanstack/react-query";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      hero: {
        populate: "*",
      },
      about: {
        populate: "*",
      },
      missionAndVision: {
        populate: "*",
      },
      globalExcellence: {
        populate: "*",
      },
      coreValueBgImg: {
        populate: "*",
      },
      coreValueItems: {
        populate: "*",
      },
      approachItems: {
        populate: "*",
      },
      approachImage: {
        populate: "*",
      },
      teamMembers: {
        populate: "*"
      }
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAboutAdinoGlobalMarketPageData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-adino-global-market?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAboutAdinoGlobalMarketPageData = () => {
  return useQuery({
    queryKey: ["aboutAdinoGlobalMarketPage"],
    queryFn: getAboutAdinoGlobalMarketPageData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
