"use client";

import { useQuery } from "@tanstack/react-query";
import qs from "qs";

const query = qs.stringify(
  {
    populate: {
      hero: {
        populate: "*",
      },
      ourModel: {
        populate: "*",
      },
      ourStrength: {
        populate: "*",
      },
      missionAndVision: {
        populate: "*",
      },
      featureCompetitor: {
        populate: "*",
      },
      valueItems: {
        populate: "*",
      },
      teamMembers: {
        populate: {
          social_links: {
            populate: "*",
          }
        }
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

const getAboutAssetManagementPageData = async () => {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about-asset-management?${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useAboutAssetManagementPageData = () => {
  return useQuery({
    queryKey: ["aboutAssetManagementPage"],
    queryFn: getAboutAssetManagementPageData,   
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
};
