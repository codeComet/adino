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
          image: {
            populate: "*",
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
);

export const getAboutAssetManagementPageData = async () => {
  return fetchStrapi(`/api/about-asset-management?${query}`);
};

export const useAboutAssetManagementPageData = () => {
  return useQuery({
    queryKey: ["aboutAssetManagementPage"],
    queryFn: getAboutAssetManagementPageData,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
};
