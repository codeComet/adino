"use client";

import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { fetchStrapi } from "@/lib/utils";

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
  return fetchStrapi(`/api/about-adino-global-market?${query}`);
};

export const useAboutAdinoGlobalMarketPageData = () => {
  return useQuery({
    queryKey: ["aboutAdinoGlobalMarketPage"],
    queryFn: getAboutAdinoGlobalMarketPageData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
